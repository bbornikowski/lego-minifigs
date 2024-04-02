<template>
  <div class="spinner">
    <span class="spinner__inner" />
  </div>
</template>

<style lang="scss">
  .spinner {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    transition:
      opacity 0.3s,
      visibility 0.3s;
    z-index: 10;

    &__inner {
      border-radius: 50%;
      height: 24px;
      position: relative;
      width: 24px;

      &::before,
      &::after {
        border: 2px solid $cGreen02;
        border-radius: 50%;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      &::before {
        animation: spin 1s 1s linear infinite;
        border-right: 2px solid $cWhite;
      }

      &::after {
        animation: spin 1s 0.3s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite;
        border-bottom: 2px solid $cWhite;
      }
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
