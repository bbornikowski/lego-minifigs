import { createEnv } from '@t3-oss/env-nuxt';
import { z } from 'zod';

export default createEnv({
  client: {
    NUXT_PUBLIC_BASE_URL: z.string().url(),
    NUXT_PUBLIC_DEFAULT_LOCALE: z.literal('en'),
  },
});
