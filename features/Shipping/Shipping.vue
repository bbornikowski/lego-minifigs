<template>
  <section class="shipping">
    <Container class="shipping__container">
      <template v-if="!error">
        <div class="shipping__figure">
          <FigureDetailsSkeleton v-if="pending" />

          <FigureDetails
            v-if="!pending && data"
            :name="data.name"
            :image="data.image"
            :parts="data.parts"
          />
        </div>

        <ShippingForm />
      </template>

      <NotFound v-else />
    </Container>
  </section>
</template>

<script lang="ts" setup>
  import { useLocalStorage } from '@vueuse/core';

  import { ROUTE_HOME } from '~/constants/router';
  import { API_MINIFIG } from '~/constants/api';
  import { STORAGE_MINIFIG_ID } from '~/constants/storage';
  import type { MinifigDetailsResponse } from '~/server/types/response';

  const {
    params: { id },
  } = useRoute();

  const storage = useLocalStorage<string>(STORAGE_MINIFIG_ID, '');

  if (typeof id !== 'string' || id !== storage.value) {
    navigateTo(ROUTE_HOME);
  }

  const { data, pending, error } = useLazyFetch<MinifigDetailsResponse>(
    API_MINIFIG(storage.value)
  );
</script>

<style lang="scss">
  .shipping {
    padding: 48px 0;

    &__container {
      display: flex;
      justify-content: space-between;

      @include rwd('large-tablet') {
        align-items: center;
        flex-direction: column;
        row-gap: 32px;
      }
    }

    &__figure {
      margin-right: 32px;
      max-width: 420px;
      width: 100%;

      @include rwd('large-tablet') {
        margin-right: 0;
      }
    }
  }
</style>
