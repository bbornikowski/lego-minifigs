import { z } from 'zod';

import { REGEX_DATE, REGEX_ZIP_CODE } from '~/constants/regex';

const OrderCreateSchema = z.object({
  name: z.string().min(1).max(255),
  surname: z.string().min(1).max(255),
  phone: z.string().min(1).max(255),
  email: z.string().min(1).email().max(255),
  city: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
  date_of_birth: z.string().min(1).regex(REGEX_DATE),
  zip_code: z.string().min(1).regex(REGEX_ZIP_CODE),
});

export type OrderCreateRequest = z.infer<typeof OrderCreateSchema>;

export default defineEventHandler(async (event) => {
  await readValidatedBody(event, (body) => OrderCreateSchema.parse(body));

  return sendNoContent(event);
});
