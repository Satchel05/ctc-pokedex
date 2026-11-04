import { z } from 'zod';

// validates the :pokemon_id route param (arrives as a string)
const PokemonParamsSchema = z.object({
  pokemon_id: z.coerce.number().int().positive(),
});

export { PokemonParamsSchema };
