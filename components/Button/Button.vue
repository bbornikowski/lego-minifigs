<template>
  <component
    :is="component"
    :to="to"
    :type="type"
    :class="{
      'button--primary': variant === 'primary',
      'button--text': variant === 'text',
    }"
    class="button"
  >
    <slot />

    <AsyncSpinner v-if="loading" />
  </component>
</template>

<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';

  const AsyncSpinner = defineAsyncComponent(
    () => import('~/components/Spinner/Spinner.vue')
  );

  interface ButtonProps {
    to?: RouteLocationRaw;
    loading?: boolean;
    type?: HTMLButtonElement['type'];
    variant?: 'primary' | 'text';
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    to: undefined,
    loading: false,
    type: 'button',
    variant: 'primary',
  });

  const component = computed(() => {
    if (props.to) {
      return resolveComponent('NuxtLinkLocale');
    }

    return 'button';
  });
</script>

<style lang="scss">
  .button {
    $p: &;

    align-items: center;
    border-radius: 32px;
    column-gap: 8px;
    display: inline-flex;
    font-size: 14px;
    font-weight: 700;
    justify-content: center;
    line-height: 24px;
    padding: 10px 16px;
    text-align: center;
    transition:
      background-color 0.3s,
      border-color 0.3s,
      opacity 0.2s,
      box-shadow 0.2s;
    white-space: nowrap;

    @include rwd('large-phone') {
      font-size: 12px;
      line-height: 20px;
      padding: 6px 12px;
    }

    &[disabled] {
      opacity: 0.3;
    }

    &--primary {
      background-color: $cBrand01;
      color: $cWhite;

      &:hover {
        background-color: $cBrand02;
      }

      &:focus {
        box-shadow:
          0 0 0 2px $cWhite,
          0 0 0 3px $cGreen02;
      }
    }

    &--text {
      background-color: transparent;
      color: $cNGray09;

      &:hover {
        background-color: $cNGray02;
      }

      &:focus {
        background-color: $cNGray02;
        box-shadow:
          0 0 0 2px $cWhite,
          0 0 0 3px $cGreen02;
      }
    }
  }
</style>
