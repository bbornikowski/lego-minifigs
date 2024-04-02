<template>
  <div class="figureDetailsSkeleton">
    <div class="figureDetailsSkeleton__image" />

    <div class="figureDetailsSkeleton__name" />

    <div class="figureDetailsSkeleton__count" />

    <div class="figureDetailsSkeleton__parts">
      <div
        v-for="index in 4"
        :key="index"
        class="figureDetailsSkeleton__part"
      >
        <span class="figureDetailsSkeleton__partImage" />

        <div class="figureDetailsSkeleton__partContent">
          <span class="figureDetailsSkeleton__partText" />
          <span class="figureDetailsSkeleton__partText" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .figureDetailsSkeleton {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    width: 100%;

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

    @include rwd('tablet') {
      border: 0;
      flex-direction: column;
      padding: 0 0 16px;
      position: relative;

      &:not(:first-of-type) {
        margin-top: 20px;
      }
    }

    &__image {
      background-color: $cNGray02;
      border-radius: 12px;
      height: 200px;
      margin-bottom: 12px;
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
    &__count {
      background-color: $cNGray02;
      border-radius: 16px;
      display: block;
      height: 24px;
      max-width: 320px;
      width: 100%;

      @include rwd('large-phone') {
        height: 20px;
      }
    }

    &__name {
      margin-bottom: 6px;
    }

    &__parts {
      display: flex;
      flex-direction: column;
      margin-top: 24px;
      row-gap: 16px;
    }

    &__part {
      column-gap: 12px;
      display: flex;
    }

    &__partImage {
      background-color: $cNGray02;
      border-radius: 16px;
      display: block;
      height: 48px;
      width: 48px;
    }

    &__partContent {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      row-gap: 4px;
    }

    &__partText {
      background-color: $cNGray02;
      border-radius: 16px;
      display: block;
      height: 24px;
      width: 100%;

      @include rwd('small-tablet') {
        display: none;
      }

      &:first-of-type {
        max-width: 420px;
      }

      &:last-of-type {
        max-width: 180px;
      }
    }
  }
</style>
