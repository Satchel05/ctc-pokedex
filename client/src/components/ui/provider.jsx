import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

// Chakra gives us component behaviour; Tailwind does the styling.
// - preflight: false -> Tailwind's reset is the only one.
// - layers are renamed so index.css can put all of Chakra's styles *below*
//   Tailwind's, which means a Tailwind class always beats a Chakra default.
const system = createSystem(defaultConfig, {
  preflight: false,
  layers: {
    reset: 'chakra-reset',
    base: 'chakra-base',
    tokens: 'chakra-tokens',
    recipes: 'chakra-recipes',
  },
});

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
