<template>
  <Banner />
</template>

<script lang="ts" setup>
  const { t } = useI18n();

  useHead({
    titleTemplate: (title) => `${t('homepage')} - ${title || null}`,
  });
</script>
