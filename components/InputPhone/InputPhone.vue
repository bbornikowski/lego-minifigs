<template>
  <div class="phoneInput">
    <Text
      :for="name"
      tag="label"
      size="small"
      weight="regular"
      class="phoneInput__label"
    >
      {{ label }}
    </Text>

    <div class="phoneInput__fieldWrapper">
      <Menu
        :options="PHONE_CODES"
        @change="emitCodeChange"
      >
        <Button
          variant="text"
          class="phoneInput__dropdownButton"
        >
          <span>
            {{ value.code }}
          </span>
        </Button>

        <template #option="{ value: optionValue, label: optionLabel }">
          <span class="phoneInput__dropdownOptionCountry">
            {{ optionLabel }}
          </span>

          <span class="phoneInput__dropdownOptionCode">
            {{ optionValue }}
          </span>
        </template>
      </Menu>

      <input
        v-bind="$attrs"
        :id="name"
        type="text"
        :name="name"
        :value="value.number"
        :placeholder="placeholder"
        class="phoneInput__field"
        @change="emitNumberChange"
      />
    </div>

    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>

<script lang="ts" setup>
  import { PHONE_CODES } from '~/constants/codes';

  interface PhoneInputProps {
    name: string;
    label: string;
    placeholder?: string;
    errorMessage?: string;
    value: {
      code: string;
      number: string;
    };
  }

  const emit = defineEmits(['change']);
  const props = defineProps<PhoneInputProps>();

  const emitCodeChange = (code: string) => {
    emit('change', {
      ...props.value,
      code,
    });
  };

  const emitNumberChange = (event: Event) => {
    if (event.target && 'value' in event.target) {
      emit('change', {
        ...props.value,
        number: event.target.value,
      });
    }
  };
</script>

<style lang="scss">
  .phoneInput {
    $p: &;

    width: 100%;

    &__fieldWrapper {
      background-color: $cWhite;
      border: 1px solid $cNGray04;
      border-radius: 8px;
      display: flex;
      transition: border-color 0.3s;

      &:hover {
        border-color: $cNGray05;

        #{$p}__dropdownButton > button {
          border-color: $cNGray05;
        }
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
      color: $cNGray07;
      display: block;
      margin-bottom: 8px;
    }

    &__dropdownButton {
      background-color: $cNGray01;
      border-radius: 10px 0 0 10px;
      border-right: 1px solid $cNGray04;
      letter-spacing: 0.056px;
      position: relative;

      &::before {
        background-color: $cNGray02;
        border-radius: 8px;
        bottom: 6px;
        content: '';
        left: 6px;
        opacity: 0;
        position: absolute;
        right: 6px;
        top: 6px;
        transition: opacity 0.3s;
      }

      &:focus,
      &:hover {
        background-color: transparent !important;
        border-right-color: transparent !important;
        box-shadow: none;
        color: $cNGray09 !important;

        &::before {
          opacity: 1;
        }
      }

      span {
        position: relative;
      }

      svg {
        color: $cNGray07;
      }
    }

    &__dropdownOptionCountry {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__dropdownOptionCode {
      flex-shrink: 0;
      font-weight: 700;
      margin-left: auto;
    }

    &__field {
      color: $cNGray09;
      flex-grow: 1;
      padding-left: 12px;

      &::placeholder {
        color: $cNGray05;
      }
    }
  }
</style>
