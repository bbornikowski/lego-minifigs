import { fileURLToPath } from 'node:url';
import { $fetch, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { API_MINIFIG, API_MINIFIGS, API_ORDER } from '../../constants/api';
import type { GetMinifigsResponse } from '../../server/api/minifigs/index.get';
import {
  MinifigDetailsResponseSchema,
  MinifigResponseSchema,
  type MinifigDetailsResponse,
} from '../../server/types/response';

await setup({
  rootDir: fileURLToPath(new URL('../', import.meta.url)),
});

let minifigId = '';

describe('Server', () => {
  it('[GET] All minifigs', async () => {
    const data: GetMinifigsResponse = await $fetch(API_MINIFIGS);

    expect(data.results?.length).toEqual(3);
    expect(() =>
      MinifigResponseSchema.array().parse(data.results)
    ).not.toThrow();

    minifigId = data.results[0].id;
  });

  it('[GET] Single minifig', async () => {
    const data: MinifigDetailsResponse = await $fetch(API_MINIFIG(minifigId));

    expect(data).toBeTruthy();
    expect(() => MinifigDetailsResponseSchema.parse(data)).not.toThrow();
  });

  it('[GET] Single minifig 404', async () => {
    const NON_EXISTING_ID = 'definitely-not-existing-minifig-id';

    await expect(() => $fetch(API_MINIFIG(NON_EXISTING_ID))).rejects.toThrow(
      '404'
    );
  });

  it('[POST] Create order validation error', async () => {
    await expect(() =>
      $fetch(API_ORDER, {
        method: 'POST',
        body: {
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          address: faker.location.streetAddress(),
          zip_code: faker.location.zipCode('##-###'),
        },
      })
    ).rejects.toThrow();
  });

  it('[POST] Create order', async () => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const result = await $fetch(API_ORDER, {
      method: 'POST',
      body: {
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        date_of_birth: formatter.format(faker.date.birthdate()),
        zip_code: faker.location.zipCode('##-###'),
      },
    });

    expect(result).toEqual(undefined);
  });
});
