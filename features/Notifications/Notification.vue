<template>
  <button
    type="button"
    @click="handleRemoveNotification"
  >
    <div
      :class="{
        'alert--error': variant === 'error',
        'alert--success': variant === 'success',
      }"
      class="alert"
    >
      <div class="alert__icon">
        <IconAlertCircleFilled :size="20" />
      </div>

      <Text size="small">
        {{ text }}
      </Text>
    </div>
  </button>
</template>

<script lang="ts" setup>
  import { IconAlertCircleFilled } from '@tabler/icons-vue';

  export interface NotificationProps {
    id: number;
    variant?: 'success' | 'error';
    text: string;
  }

  const timer = ref<NodeJS.Timeout | null>(null);
  const props = withDefaults(defineProps<NotificationProps>(), {
    variant: 'success',
    title: '',
  });
  const emit = defineEmits(['onRemove']);

  const handleRemoveNotification = () => {
    emit('onRemove', props.id);
  };

  onUnmounted(() => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
  });

  onMounted(() => {
    timer.value = setTimeout(handleRemoveNotification, 3000);
  });
</script>

<style lang="scss">
  .alert {
    $p: &;

    align-items: flex-start;
    background-color: $cGray01;
    border-radius: 8px;
    column-gap: 12px;
    display: flex;
    padding: 12px 16px;

    &--error {
      background-color: $cRed01;

      #{$p}__icon {
        color: $cRed03;
      }
    }

    &--success {
      background-color: $cGreen01;
      color: $cWhite;

      #{$p}__icon {
        color: $cWhite;
      }
    }

    &__icon {
      color: $cGray02;
      display: flex;
    }
  }
</style>
