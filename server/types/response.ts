import { z } from 'zod';

export interface ApiMinifingsResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const MinifigResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type MinifigResponse = z.infer<typeof MinifigResponseSchema>;

const MinifigPartSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});

export const MinifigDetailsResponseSchema = MinifigResponseSchema.extend({
  parts: MinifigPartSchema.array(),
});

export type MinifigDetailsResponse = z.infer<
  typeof MinifigDetailsResponseSchema
>;
