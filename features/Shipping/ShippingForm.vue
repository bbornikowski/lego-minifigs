<template>
  <form
    class="shippingForm"
    @submit.prevent="onSubmit"
  >
    <Heading tag="h4">
      {{ t('shipping_details') }}
    </Heading>

    <div class="shippingForm__fields">
      <Field
        v-for="field in fields"
        v-slot="{ field: validationField, value, handleChange }"
        :key="field.id"
        :name="field.id"
      >
        <div
          :class="{
            'shippingForm__field--full': field.size === FieldSizes.FULL,
          }"
          class="shippingForm__field"
        >
          <component
            v-bind="{ ...validationField, ...field.componentProps }"
            :is="field.component"
            :value="value"
            :error-message="field.error"
            @change="handleChange"
          />
        </div>
      </Field>
    </div>

    <Button
      type="submit"
      :loading="isLoading"
      :disabled="!meta.valid"
    >
      {{ t('submit') }}
    </Button>
  </form>
</template>

<script lang="ts" setup>
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm, Field } from 'vee-validate';
  import { z } from 'zod';
  import { useLocalStorage } from '@vueuse/core';

  import Input from '~/components/Input/Input.vue';
  import InputPhone from '~/components/InputPhone/InputPhone.vue';
  import { API_ORDER } from '~/constants/api';
  import { REGEX_DATE, REGEX_ZIP_CODE } from '~/constants/regex';
  import { ROUTE_HOME } from '~/constants/router';
  import { STORAGE_IS_ORDERED } from '~/constants/storage';
  import type { NotifyType } from '~/features/Notifications/Notifications.vue';
  import type { OrderCreateRequest } from '~/server/api/order/index.post';

  enum FieldSizes {
    FULL,
    HALF,
  }

  interface Fields {
    id: string;
    error?: string;
    size: FieldSizes;
    component: Component<
      InstanceType<typeof Input | typeof InputPhone>['$props']
    >;
    componentProps: Partial<
      InstanceType<typeof Input | typeof InputPhone>['$props']
    >;
  }

  const storage = useLocalStorage<boolean>(STORAGE_IS_ORDERED, false);
  const { t } = useI18n();
  const notify = inject<NotifyType>('notify');

  const isLoading = ref(false);

  const { handleSubmit, meta, defineField, errors } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        name: z
          .string()
          .min(1, t('required'))
          .max(255, t('max_length', { length: 255 })),
        surname: z
          .string()
          .min(1, t('required'))
          .max(255, t('max_length', { length: 255 })),
        phone: z.object({
          code: z.string().min(1, t('required')),
          number: z.string().min(1, t('required')),
        }),
        email: z
          .string()
          .min(1, t('required'))
          .email({ message: t('invalid_email') })
          .max(255, t('max_length', { length: 255 })),
        date_of_birth: z
          .string()
          .min(1, t('required'))
          .regex(REGEX_DATE, { message: t('invalid_date') }),
        address: z
          .string()
          .min(1, t('required'))
          .max(255, t('max_length', { length: 255 })),
        city: z
          .string()
          .min(1, t('required'))
          .max(255, t('max_length', { length: 255 })),
        zip_code: z
          .string()
          .min(1, t('required'))
          .regex(REGEX_ZIP_CODE, { message: t('invalid_zip_code') }),
      })
    ),
    initialValues: {
      name: '',
      surname: '',
      email: '',
      city: '',
      date_of_birth: '',
      address: '',
      zip_code: '',
      phone: {
        code: '+48',
        number: '',
      },
    },
  });

  const [, numberInput] = defineField('phone.number');

  const fields = computed((): Fields[] => [
    {
      id: 'name',
      error: errors.value.name,
      size: FieldSizes.HALF,
      component: Input,
      componentProps: {
        type: 'text',
        name: 'name',
        label: t('name'),
        placeholder: 'John',
      },
    },
    {
      id: 'surname',
      error: errors.value.surname,
      size: FieldSizes.HALF,
      component: Input,
      componentProps: {
        type: 'text',
        name: 'surname',
        label: t('surname'),
        placeholder: 'Doe',
      },
    },
    {
      id: 'email',
      error: errors.value.email,
      size: FieldSizes.FULL,
      component: Input,
      componentProps: {
        type: 'email',
        name: 'email',
        label: t('email'),
        placeholder: 'john.doe@example.com',
      },
    },
    {
      id: 'phone',
      error: errors.value['phone.number'],
      size: FieldSizes.FULL,
      component: InputPhone,
      componentProps: {
        ...numberInput.value,
        type: 'phone',
        name: 'phone',
        label: t('phone'),
        placeholder: '509 832 943',
      },
    },
    {
      id: 'date_of_birth',
      error: errors.value.date_of_birth,
      size: FieldSizes.FULL,
      component: Input,
      componentProps: {
        type: 'text',
        name: 'date_of_birth',
        label: t('date_of_birth'),
        placeholder: 'DD/MM/YYYY',
        mask: {
          mask: '00/00/0000',
        },
      },
    },
    {
      id: 'address',
      error: errors.value.address,
      size: FieldSizes.FULL,
      component: Input,
      componentProps: {
        type: 'text',
        name: 'address',
        label: t('address'),
        placeholder: 'Słoneczna 32',
      },
    },
    {
      id: 'city',
      error: errors.value.city,
      size: FieldSizes.HALF,
      component: Input,
      componentProps: {
        type: 'text',
        name: 'city',
        label: t('city'),
        placeholder: 'Poznań',
      },
    },
    {
      id: 'zip_code',
      error: errors.value.zip_code,
      size: FieldSizes.HALF,
      component: Input,
      componentProps: {
        type: 'text',
        name: 'city',
        label: t('zip_code'),
        placeholder: '61-200',
        mask: {
          mask: '00-000',
        },
      },
    },
  ]);

  const handleUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();

    return (event.returnValue = '');
  };

  onMounted(() => {
    window.addEventListener('beforeunload', handleUnload, true);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleUnload, true);
  });

  const onSubmit = handleSubmit(
    async ({ phone: { code, number }, ...params }) => {
      try {
        isLoading.value = true;

        const body: OrderCreateRequest = {
          ...params,
          phone: `${code} ${number}`,
        };

        await $fetch(API_ORDER, {
          method: 'POST',
          body,
        });

        storage.value = true;

        notify?.({
          variant: 'success',
          text: t('shipping_form_success'),
        });

        navigateTo(ROUTE_HOME);
      } catch (e) {
        notify?.({
          variant: 'error',
          text: t('shipping_form_error'),
        });
      } finally {
        isLoading.value = false;
      }
    }
  );
</script>

<style lang="scss">
  .shippingForm {
    align-items: flex-start;
    border: 1px solid $cNGray03;
    border-radius: 12px;
    column-gap: 24px;
    display: flex;
    flex-direction: column;
    max-width: 680px;
    padding: 32px;
    row-gap: 20px;
    width: 100%;

    @include rwd('large-tablet') {
      padding: 20px 16px;
    }

    &__fields {
      column-gap: 24px;
      display: flex;
      flex-wrap: wrap;
      row-gap: 20px;
    }

    &__field {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      &--full {
        width: 100%;
      }
    }
  }
</style>
