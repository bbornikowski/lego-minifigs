<template>
  <div class="propertiesNotFound">
    <NuxtImg
      class="propertiesNotFound__noResultsImage"
      src="/images/not_found.jpg"
      alt="No results"
      height="160"
      width="160"
    />

    <Heading
      tag="h5"
      component="p"
    >
      {{ t('error_minifig_title') }}
    </Heading>

    <Text>
      {{ t('error_minifig_text') }}
    </Text>
  </div>
</template>

<script lang="ts" setup>
  const { t } = useI18n();
</script>

<style lang="scss">
  .propertiesNotFound {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 376px;
    row-gap: 8px;
    text-align: center;
    width: 100%;

    &__noResultsImage {
      margin-bottom: 16px;
    }
  }
</style>
