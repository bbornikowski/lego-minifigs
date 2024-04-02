<template>
  <slot />

  <div class="notifications">
    <LazyNotification
      v-for="notification in notifications"
      :key="notification.id"
      v-bind="notification"
      @on-remove="handleRemoveNotification(notification.id)"
    />
  </div>
</template>

<script lang="ts" setup>
  import type { NotificationProps } from './Notification.vue';

  const count = ref(0);
  const notifications = ref<NotificationProps[]>([]);

  const notify = (notification: Omit<NotificationProps, 'id'>) => {
    notifications.value.push({
      ...notification,
      id: count.value,
    });
  };

  const handleRemoveNotification = (
    notificationId: NotificationProps['id']
  ) => {
    notifications.value = notifications.value.filter(
      ({ id }) => id !== notificationId
    );
  };

  provide('notify', notify);

  export type NotifyType = typeof notify;
</script>

<style lang="scss">
  .notifications {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 24px;
    row-gap: 16px;
    top: 24px;
    z-index: 10;

    @include rwd('large-tablet') {
      bottom: unset;
      top: 24px;
    }
  }
</style>
