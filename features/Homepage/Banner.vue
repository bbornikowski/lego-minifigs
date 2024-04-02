<template>
  <section class="banner">
    <Heading tag="h1">
      {{ bannerText }}
    </Heading>

    <Button
      v-if="!storage"
      :to="ROUTE_MINIFIGS"
    >
      {{ t('banner_button') }}
    </Button>
  </section>
</template>

<script lang="ts" setup>
  import { useLocalStorage } from '@vueuse/core';

  import { STORAGE_IS_ORDERED } from '~/constants/storage';
  import { ROUTE_MINIFIGS } from '~/constants/router';

  const storage = useLocalStorage<boolean>(STORAGE_IS_ORDERED, false);

  const { t } = useI18n();

  const bannerText = storage.value
    ? t('banner_title_completed')
    : t('banner_title');
</script>

<style lang="scss">
  .banner {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    row-gap: 32px;
    text-align: center;
  }
</style>
