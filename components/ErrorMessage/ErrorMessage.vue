<template>
  <span
    class="error"
    data-error-message
  >
    <slot />
  </span>
</template>

<script lang="ts"></script>

<style lang="scss">
  .error {
    color: $cRed03;
    font-size: 12px;
    line-height: 20px;
    margin-top: 2px;
  }
</style>
