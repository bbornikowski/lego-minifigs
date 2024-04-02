<template>
  <component
    :is="component || tag"
    :class="`heading--${tag}`"
    class="heading"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
  interface HeadingProps {
    component?: string;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }

  withDefaults(defineProps<HeadingProps>(), {
    tag: 'h4',
    component: undefined,
  });
</script>

<style lang="scss">
  .heading {
    display: block;
    font-family: $fontTitle;
    font-weight: 700;

    &--h1 {
      font-size: 72px;
      line-height: 74px;

      @include rwd('large-tablet') {
        font-size: 48px;
        line-height: 52px;
      }

      @include rwd('small-tablet') {
        font-size: 40px;
        line-height: 46px;
      }
    }

    &--h2 {
      font-size: 48px;
      line-height: 52px;

      @include rwd('large-tablet') {
        font-size: 40px;
        line-height: 46px;
      }

      @include rwd('small-tablet') {
        font-size: 36px;
        line-height: 42px;
      }

      @include rwd('large-phone') {
        font-size: 30px;
        line-height: 36px;
      }

      @include rwd('phone') {
        font-size: 26px;
        line-height: 32px;
      }
    }

    &--h3 {
      font-size: 40px;
      line-height: 46px;

      @include rwd('large-tablet') {
        font-size: 32px;
        line-height: 40px;
      }

      @include rwd('small-tablet') {
        font-size: 28px;
        line-height: 34px;
      }

      @include rwd('phone') {
        font-size: 24px;
        line-height: 30px;
      }
    }

    &--h4 {
      font-size: 32px;
      line-height: 40px;

      @include rwd('large-tablet') {
        font-size: 24px;
        line-height: 30px;
      }

      @include rwd('small-tablet') {
        font-size: 22px;
        line-height: 32px;
      }

      @include rwd('phone') {
        font-size: 20px;
        line-height: 28px;
      }
    }

    &--h5 {
      font-size: 24px;
      line-height: 30px;

      @include rwd('large-tablet') {
        font-size: 20px;
        line-height: 28px;
      }

      @include rwd('phone') {
        font-size: 18px;
        line-height: 24px;
      }
    }

    &--h6 {
      font-size: 18px;
      letter-spacing: 0.1px;
      line-height: 24px;

      @include rwd('phone') {
        font-size: 16px;
      }
    }
  }
</style>
