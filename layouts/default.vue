<template>
  <AsyncNotifications>
    <main class="default">
      <slot />
    </main>
  </AsyncNotifications>
</template>

<script lang="ts" setup>
  const AsyncNotifications = defineAsyncComponent(
    () => import('../features/Notifications/Notifications.vue')
  );
</script>

<style lang="scss">
  .default {
    min-height: 100vh;
  }
</style>
