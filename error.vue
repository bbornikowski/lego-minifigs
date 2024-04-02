<template>
  <main class="errorPage">
    <div class="errorPage__container">
      <NuxtImg
        src="/images/error.webp"
        alt="Error page"
        class="errorPage__image"
        height="200"
        width="200"
      />

      <Heading
        tag="h3"
        component="h1"
      >
        {{ t('error_page_title') }}
      </Heading>

      <Text size="large">
        {{ t('error_page_text') }}
      </Text>

      <Button :to="ROUTE_HOME">
        {{ t('error_page_button') }}
      </Button>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { ROUTE_HOME } from '~/constants/router';

  const { t } = useI18n();
</script>

<style lang="scss">
  .errorPage {
    padding: 102px 0 104px;

    @include rwd('large-tablet') {
      padding: 86px 0;
    }

    @include rwd('small-tablet') {
      padding: 48px 0 32px;
    }

    &__container {
      align-items: center;
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      max-width: 776px;
      padding: 0 16px;
      row-gap: 16px;
      text-align: center;
      width: 100%;
    }

    &__image {
      margin-bottom: 32px;
      max-width: 200px;
      width: 100%;
    }
  }
</style>
