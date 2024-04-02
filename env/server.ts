import { createEnv } from '@t3-oss/env-nuxt';
import { z } from 'zod';

export default createEnv({
  server: {
    NUXT_PORT: z.coerce.number(),
    NUXT_REBRICKABLE_API_URL: z.string().url(),
    NUXT_REBRICKABLE_API_KEY: z.string().min(1),
  },
});
