import { useLocalStorage } from '@vueuse/core';

import { ROUTE_HOME } from '~/constants/router';
import { STORAGE_IS_ORDERED } from '~/constants/storage';

/**
 * Middleware used to check if user already
 * filled an order. It restricts user
 * from accessing the pages related to order functionalities
 * and redirects to homepage
 */
export default defineNuxtRouteMiddleware(() => {
  if (process.server) {
    return;
  }

  const storage = useLocalStorage<boolean>(STORAGE_IS_ORDERED, false);

  if (storage.value) {
    return navigateTo(ROUTE_HOME);
  }
});
