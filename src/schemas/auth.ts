import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;