<template>
  <Selection />
</template>

<script lang="ts" setup>
  const { t } = useI18n();

  useHead({
    titleTemplate: (title) => `${t('selection_title')} - ${title || null}`,
  });

  definePageMeta({
    middleware: ['order'],
  });
</script>
