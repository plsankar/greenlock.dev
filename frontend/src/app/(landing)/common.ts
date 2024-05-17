import { z } from 'zod';

export interface Authorization {
  domain: string;
  expires: Expires;
  challenges: Challenges;
  verified: null | boolean;
}

export interface Expires {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface Challenges {
  http: Http | null;
  dns: Dns | null;
}

export interface Http {
  name: string;
  content: string;
}

export interface Dns {
  name: string;
  value: string;
}

export interface Order {
  orderId: string;
  authorizations: Authorization[];
}

export const OrderRequestSchema = z.object({
  domains: z
    .string()
    .min(3, { message: 'Domains is required.' })
    .max(255)
    .refine((domains) => domains.trim().length > 0, {
      message: 'Domains is required.',
      path: ['domains'],
    }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email format.' }),
});

export type OrderFormSchemaType = z.infer<typeof OrderRequestSchema>;
