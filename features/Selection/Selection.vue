<template>
  <section class="selection">
    <Container class="selection__container">
      <template v-if="!error">
        <Heading
          tag="h5"
          class="selection__heading"
        >
          {{ t('selection_title') }}
        </Heading>

        <form
          class="selection__form"
          @submit.prevent="onSubmit"
        >
          <Field
            v-slot="{ value, handleChange }"
            name="key"
          >
            <SelectionOptions
              v-if="data?.results"
              :value="value"
              :options="data.results"
              @change="handleChange"
            />

            <SelectionOptionsSkeleton v-else />
          </Field>

          <Button
            type="submit"
            :disabled="!meta.valid"
          >
            {{ t('selection_submit') }}
          </Button>
        </form>
      </template>

      <NotFound v-else />
    </Container>
  </section>

  <AsyncSelectionDetails
    v-if="routeId"
    :id="routeId"
  />
</template>

<script lang="ts" setup>
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm, Field } from 'vee-validate';
  import { z } from 'zod';
  import { useLocalStorage } from '@vueuse/core';

  import { API_MINIFIGS } from '~/constants/api';
  import { STORAGE_MINIFIGS, STORAGE_MINIFIG_ID } from '~/constants/storage';
  import type { GetMinifigsResponse } from '~/server/api/minifigs/index.get';
  import { ROUTE_MINIFIG } from '~/constants/router';

  const AsyncSelectionDetails = defineAsyncComponent(
    () => import('./SelectionDetails.vue')
  );

  const route = useRoute();
  const { t } = useI18n();

  const selectionStorage = useLocalStorage<string>(STORAGE_MINIFIG_ID, '');
  const listStorage = useLocalStorage<GetMinifigsResponse>(
    STORAGE_MINIFIGS,
    { results: [] },
    { mergeDefaults: true }
  );
  const { data, error } = useFetch(API_MINIFIGS, {
    onResponse: ({ response }) => {
      listStorage.value = response._data;
    },
    getCachedData() {
      if (listStorage.value?.results?.length) {
        return listStorage.value;
      }

      return undefined;
    },
  });

  const { handleSubmit, meta } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        key: z.string().min(1, t('required')),
      })
    ),
    initialValues: {
      key: '',
    },
  });

  const onSubmit = handleSubmit(({ key }) => {
    selectionStorage.value = key;

    navigateTo(ROUTE_MINIFIG(key));
  });

  const routeId = computed(() => {
    return typeof route.query.id === 'string' ? route.query.id : '';
  });
</script>

<style lang="scss">
  .selection {
    display: flex;
    min-height: 100vh;
    padding: 48px 0;

    &__container {
      align-self: center;
      text-align: center;
    }

    &__heading {
      margin-bottom: 48px;
    }

    &__form {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 32px;
      row-gap: 32px;
    }
  }
</style>
