import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().max(255),
  email: z.string().email(),
});

const UpdateUserSchema = CreateUserSchema.partial().strict();

export { CreateUserSchema, UpdateUserSchema };
