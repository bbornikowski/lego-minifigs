<template>
  <div class="input">
    <Text
      :for="name"
      tag="label"
      size="small"
      weight="regular"
      class="input__label"
    >
      {{ label }}
    </Text>

    <div class="input__fieldWrapper">
      <input
        v-bind="$attrs"
        :id="name"
        v-imask="mask"
        :type="type"
        :name="name"
        :value="value"
        :aria-label="ariaLabel"
        :placeholder="placeholder"
        class="input__field"
      />

      <slot />
    </div>

    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>

<script lang="ts" setup>
  import { IMaskDirective } from 'vue-imask';

  export interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'phone';
    mask?: {
      mask: string;
    };
    label: string;
    placeholder?: string;
    errorMessage?: string;
    value?: string | number | null;
    ariaLabel?: string;
    name: string;
  }

  withDefaults(defineProps<InputProps>(), {
    type: 'text',
    mask: undefined,
    label: undefined,
    value: undefined,
    placeholder: undefined,
    errorMessage: undefined,
    ariaLabel: undefined,
  });

  const vImask = IMaskDirective;
</script>

<style lang="scss">
  .input {
    $p: &;

    width: 100%;

    &__fieldWrapper {
      background-color: $cWhite;
      border: 1px solid $cNGray04;
      border-radius: 8px;
      display: flex;
      padding: 4px;
      transition: border-color 0.3s;

      &:hover {
        border-color: $cNGray05;
      }

      &:has(:focus-within) {
        border-color: $cNGray06;
        box-shadow: 0 3px 4px -1px rgba($cGray03, 0.06);
      }

      &:has(+ [data-error-message]) {
        border-color: $cRed02;
      }

      &:has(#{$p}__field:disabled) {
        background-color: $cNGray02;
        border-color: $cNGray04;

        #{$p}__field {
          color: $cNGray05;
        }
      }
    }

    &__label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
    }

    &__field {
      color: $cNGray09;
      flex-grow: 1;
      padding: 6px 8px;
      resize: none;

      &::placeholder {
        color: $cNGray05;
      }
    }
  }
</style>
