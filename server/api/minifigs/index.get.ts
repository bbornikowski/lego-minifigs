import * as querystring from 'querystring';

import type { Minifing } from '~/server/domain/minifig';
import type {
  ApiMinifingsResponse,
  MinifigResponse,
} from '~/server/types/response';

const config = useRuntimeConfig().private;

export interface GetMinifigsResponse {
  results: MinifigResponse[];
}

/**
 * Since API does not support random search
 * the function will take at most 100 records and
 * pick 3 random records here
 */
const MINIFIGS_PAGE_SIZE = 100;
const HARRY_POTTER_THEME_ID = '246';
const MINIFIGS_RESULT_LENGTH = 3;

export default defineEventHandler(async (): Promise<GetMinifigsResponse> => {
  const requestParams = querystring.stringify({
    page_size: MINIFIGS_PAGE_SIZE,
    in_theme_id: HARRY_POTTER_THEME_ID,
  });

  const { results } = await $fetch<ApiMinifingsResponse<Minifing>>(
    `${config.NUXT_REBRICKABLE_API_URL}/lego/minifigs?${requestParams}`,
    {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `key ${config.NUXT_REBRICKABLE_API_KEY}`,
      },
    }
  );

  const randomIndexes: number[] = [];

  while (randomIndexes.length < MINIFIGS_RESULT_LENGTH) {
    const randomIndex = Math.floor(Math.random() * results.length);

    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  return {
    results: randomIndexes.map((index) => {
      const { name, set_img_url, set_num } = results[index];

      return {
        id: set_num,
        name,
        image: set_img_url,
      };
    }),
  };
});
