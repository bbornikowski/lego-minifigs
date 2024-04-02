<template>
  <div class="selectionOptionsSkeleton">
    <div
      v-for="index in 3"
      :key="index"
      class="selectionOptionsSkeleton__option"
    >
      <span class="selectionOptionsSkeleton__image" />

      <span class="selectionOptionsSkeleton__name" />

      <span class="selectionOptionsSkeleton__details" />
    </div>
  </div>
</template>

<style lang="scss">
  .selectionOptionsSkeleton {
    column-gap: 24px;
    display: flex;
    height: 410px;
    position: relative;
    width: 100%;

    @include rwd('tablet') {
      flex-direction: column;
      row-gap: 24px;
    }

    &::after {
      animation: shimmer 1s infinite;
      background-image: linear-gradient(
        90deg,
        rgba($cWhite, 0) 0,
        rgba($cWhite, 0.2) 20%,
        rgba($cWhite, 0.5) 60%,
        rgba($cWhite, 0)
      );
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(-100%);
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }

    &__option {
      align-items: center;
      background-color: $cWhite;
      border: 1px solid $cNGray03;
      border-radius: 16px;
      cursor: pointer;
      display: flex;
      flex-basis: 0%;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
      padding: 24px;
    }

    &__image {
      background-color: $cNGray02;
      border-radius: 12px;
      height: 220px;
      margin-bottom: 24px;
      margin-left: auto;
      margin-right: auto;
      max-width: 300px;
      width: 100%;

      @include rwd('tablet') {
        margin-right: 0;
        max-height: 240px;
        max-width: none;
        object-fit: cover;
        width: 100%;
      }
    }

    &__name,
    &__details {
      background-color: $cNGray02;
      border-radius: 16px;
      display: block;
      height: 24px;
      width: 100%;

      @include rwd('large-phone') {
        height: 20px;
      }
    }

    &__name {
      margin-bottom: 16px;
      max-width: 240px;
    }

    &__details {
      margin-top: auto;
      max-width: 120px;
    }
  }
</style>
