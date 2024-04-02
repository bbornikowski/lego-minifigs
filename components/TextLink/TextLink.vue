<template>
  <NuxtLinkLocale
    :to="to"
    class="link"
  >
    <slot />
  </NuxtLinkLocale>
</template>

<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';

  interface TextlinkProps {
    to: RouteLocationRaw;
  }

  defineProps<TextlinkProps>();
</script>

<style lang="scss">
  .link {
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.056px;
    text-decoration: underline;
    transition:
      color 0.3s,
      box-shadow 0.3s;

    &:hover {
      color: $cGreen04;
      text-decoration: underline;
    }

    &:focus {
      box-shadow:
        0 0 0 2px $cWhite,
        0 0 0 3px $cGreen02;
    }
  }
</style>
