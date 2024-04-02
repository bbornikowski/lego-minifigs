<template>
  <component
    :is="tag"
    :class="{
      'text--small': size === 'small',
      'text--large': size === 'large',
      'text--regular': weight === 'regular',
      'text--bold': weight === 'bold',
    }"
    class="text"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
  interface TextProps {
    tag?: string;
    size?: 'small' | 'medium' | 'large';
    weight?: 'thin' | 'regular' | 'bold';
  }

  withDefaults(defineProps<TextProps>(), {
    tag: 'p',
    size: 'medium',
    weight: 'thin',
  });
</script>

<style lang="scss">
  .text {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.16px;
    line-height: 24px;

    @include rwd('large-phone') {
      font-size: 14px;
      line-height: 20px;
    }

    &--small {
      font-size: 14px;
      line-height: 20px;
    }

    &--large {
      font-size: 18px;
      line-height: 28px;

      @include rwd('large-phone') {
        font-size: 16px;
        line-height: 24px;
      }
    }

    &--regular {
      font-weight: 500;
    }

    &--bold {
      font-weight: 700;
    }

    &:is(a) {
      border-radius: 4px;
      transition: box-shadow 0.3s;

      &:hover {
        color: $cGreen04;
        text-decoration: underline;
      }

      &:focus {
        box-shadow:
          0 0 0 2px $cWhite,
          0 0 0 3px $cGreen02;
      }
    }

    p {
      &:not(:first-of-type) {
        margin-top: 24px;
      }
    }

    div {
      margin-top: 24px;
    }

    a {
      font-size: inherit;
      letter-spacing: inherit;
      line-height: inherit;
    }
  }
</style>
