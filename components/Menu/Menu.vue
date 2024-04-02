<template>
  <Menu v-slot="{ open }">
    <div
      :class="open && 'menu--open'"
      class="menu"
    >
      <Float
        :placement="placement"
        portal
      >
        <MenuButton
          as="template"
          data-menu
        >
          <slot />
        </MenuButton>

        <MenuItems class="menu__list">
          <MenuItem
            v-for="option in options"
            :key="option.value"
            v-slot="{ active }"
            as="template"
          >
            <button
              class="menu__option"
              :class="active && 'menu__option--active'"
              type="button"
              @click="handleEmitChange(option.value)"
            >
              <slot
                name="option"
                v-bind="option"
              />
            </button>
          </MenuItem>
        </MenuItems>
      </Float>
    </div>
  </Menu>
</template>

<script lang="ts" setup>
  import { Float } from '@headlessui-float/vue';
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

  export interface MenuOption {
    label: string;
    value: string | number;
  }

  interface MenuProps {
    title?: string;
    options: MenuOption[];
    placement?: 'bottom-start' | 'bottom-end';
  }

  const emit = defineEmits(['change']);
  withDefaults(defineProps<MenuProps>(), {
    title: '',
    placement: 'bottom-start',
  });

  const handleEmitChange = (value: MenuOption['value']) => {
    emit('change', value);
  };
</script>

<style lang="scss">
  .menu {
    $p: &;

    cursor: pointer;
    display: flex;
    position: relative;
    white-space: nowrap;

    &--open {
      *[class*='endIcon'] {
        transform: rotate(180deg);
      }
    }

    svg {
      transition: transform 0.2s;
    }

    &__list {
      background-color: $cWhite;
      border: 1px solid $cNGray03;
      border-radius: 12px;
      box-shadow:
        0 24px 64px -8px rgba($cGray03, 0.12),
        0 48px 72px -36px rgba($cGray03, 0.04);
      margin-top: 4px;
      max-height: 270px;
      max-width: 300px;
      min-width: 226px;
      overflow-y: auto;
      padding: 12px 0;
      transition:
        opacity 0.3s,
        visibility 0.3s;
    }

    &__listTitle {
      margin-bottom: 4px;
      padding: 0 16px;
    }

    &__option {
      align-items: center;
      column-gap: 8px;
      cursor: pointer;
      display: flex;
      padding: 8px 16px;
      transition: background-color 0.3s;
      width: 100%;

      &:focus,
      &:hover,
      &--active {
        background-color: $cNGray02;
      }
    }
  }
</style>
