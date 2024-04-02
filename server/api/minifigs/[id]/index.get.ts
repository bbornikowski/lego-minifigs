import { z } from 'zod';

import type { Minifing, MinifingPart } from '~/server/domain/minifig';
import type {
  ApiMinifingsResponse,
  MinifigDetailsResponse,
} from '~/server/types/response';

const config = useRuntimeConfig().private;

export default defineEventHandler(
  async (event): Promise<MinifigDetailsResponse> => {
    const { id } = await getValidatedRouterParams(event, (param) =>
      z
        .object({
          id: z.string(),
        })
        .parse(param)
    );

    const minifigData = await $fetch<Minifing>(
      `${config.NUXT_REBRICKABLE_API_URL}/lego/minifigs/${id}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Authorization: `key ${config.NUXT_REBRICKABLE_API_KEY}`,
        },
      }
    );

    if (!minifigData) {
      throw createError({
        statusCode: 404,
        statusMessage: `Minifig with id ${id} not found`,
      });
    }

    const minifigParts = await $fetch<ApiMinifingsResponse<MinifingPart>>(
      `${config.NUXT_REBRICKABLE_API_URL}/lego/minifigs/${id}/parts`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Authorization: `key ${config.NUXT_REBRICKABLE_API_KEY}`,
        },
      }
    );

    return {
      id: minifigData.set_num,
      name: minifigData.name,
      image: minifigData.set_img_url,
      parts: minifigParts.results.map((part) => ({
        id: part.id,
        name: part.part.name,
        image: part.part.part_img_url,
      })),
    };
  }
);
