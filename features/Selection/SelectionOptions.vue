<template>
  <RadioGroup
    name="key"
    :value="value"
    class="selectionOptions"
    @update:model-value="handleChange"
  >
    <RadioGroupOption
      v-for="option in options"
      :key="option.id"
      :value="option.id"
      class="selectionOptions__option"
    >
      <NuxtImg
        :src="option.image"
        :alt="option.name"
        class="selectionOptions__image"
        format="webp, jpg"
        width="220"
        height="220"
        placeholder
      />

      <RadioGroupLabel as="template">
        <Text
          weight="bold"
          class="selectionOptions__name"
        >
          {{ option.name }}
        </Text>
      </RadioGroupLabel>

      <TextLink
        :to="{
          path: route.path,
          query: {
            id: option.id,
          },
        }"
        class="selectionOptions__details"
      >
        {{ t('selection_details') }}
      </TextLink>
    </RadioGroupOption>
  </RadioGroup>
</template>

<script lang="ts" setup>
  import {
    RadioGroup,
    RadioGroupOption,
    RadioGroupLabel,
  } from '@headlessui/vue';

  import type { MinifigResponse } from '~/server/types/response';

  const { t } = useI18n();
  const route = useRoute();

  interface SelectionOptionsProps {
    value: string;
    options: MinifigResponse[];
  }

  const emit = defineEmits(['change']);
  defineProps<SelectionOptionsProps>();

  const handleChange = (data: string) => {
    emit('change', data);
  };
</script>

<style lang="scss">
  .selectionOptions {
    column-gap: 24px;
    display: flex;
    width: 100%;

    @include rwd('tablet') {
      flex-direction: column;
      row-gap: 24px;
    }

    &__option {
      align-items: center;
      background-color: $cWhite;
      border: 1px solid $cNGray03;
      border-radius: 16px;
      cursor: pointer;
      display: flex;
      flex-basis: 0%;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
      padding: 24px;

      &[aria-checked='true'] {
        border-color: $cGreen02;
      }

      &[data-headlessui-state='active'] {
        border-color: $cGreen03;
        box-shadow: 0 0 0 3px rgba($cGreen03, 0.08);
      }
    }

    &__image {
      display: block;
      margin-bottom: 24px;
      max-width: 220px;
      width: 100%;

      @include rwd('tablet') {
        max-width: 180px;
      }
    }

    &__name {
      margin-bottom: 16px;
    }

    &__details {
      margin-top: auto;
    }
  }
</style>
