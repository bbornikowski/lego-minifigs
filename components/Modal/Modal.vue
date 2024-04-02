<template>
  <Dialog
    :open="true"
    class="modal"
    @close="handleEmitClose"
  >
    <DialogPanel class="modal__container">
      <DialogTitle class="modal__header">
        <Heading
          v-if="title"
          tag="h6"
          class="modal__heading"
        >
          {{ title }}
        </Heading>

        <Button
          type="button"
          :aria-label="t('close_button')"
          class="modal__closeButton"
          @click="handleEmitClose"
        >
          <IconX :size="20" />
        </Button>
      </DialogTitle>

      <div class="modal__content">
        <slot />
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script lang="ts" setup>
  import { IconX } from '@tabler/icons-vue';
  import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

  interface ModalProps {
    title?: string;
  }

  const { t } = useI18n();

  defineProps<ModalProps>();
  const emit = defineEmits(['close']);

  onMounted(() => {
    document.body.style.overflow = 'hidden';
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = 'auto';
  });

  const handleEmitClose = () => {
    emit('close');
  };
</script>

<style lang="scss">
  .modal {
    align-items: center;
    background-color: rgba($cGray02, 0.8);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;

    &__container {
      background-color: $cWhite;
      border: 1px solid $cNGray03;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      max-height: 85vh;
      max-width: 620px;
      width: 100%;

      @include rwd('small-tablet') {
        align-self: flex-end;
        border-radius: 0;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        max-width: none;
      }
    }

    &__header {
      align-items: center;
      border-bottom: 1px solid $cNGray03;
      display: flex;
      justify-content: space-between;
      padding: 14px 20px;
    }

    &__heading {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__closeButton {
      align-items: center;
      background-color: $cWhite;
      border: 1px solid $cNGray03;
      border-radius: 50%;
      color: $cNGray06;
      display: inline-flex;
      height: 100%;
      margin-left: auto;
      padding: 9px;
      position: relative;
      transition:
        background-color 0.3s,
        border-color 0.3s,
        box-shadow 0.3s;

      &:hover {
        background-color: $cWhite;
        border: 1px solid $cNGray04;
      }

      &:focus {
        border-color: $cGreen03;
        box-shadow: 0 0 0 3px rgba($cGreen04, 0.08);
      }

      &[disabled] {
        opacity: 0.5;
      }

      svg {
        height: 20px;
        width: 20px;
      }
    }

    &__content {
      align-items: center;
      display: flex;
      flex-direction: column;
      overflow: auto;
      padding: 32px;

      @include rwd('large-tablet') {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
</style>
