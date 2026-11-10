import { ThemeProvider } from 'next-themes';

// Puts a `dark` class on <html> (following the OS setting by default).
// Both Chakra and Tailwind's `dark:` variant read that class.
export function ColorModeProvider(props) {
  return (
    <ThemeProvider
      attribute='class'
      disableTransitionOnChange
      {...props}
    />
  );
}
