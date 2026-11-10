import { IconButton } from '@chakra-ui/react';

// Round +/✓ button in the corner of a PokemonCard.
// Chakra IconButton for behaviour; Tailwind classes for the look.
export const TeamToggleButton = ({ onTeam = false, teamFull = false, onClick }) => {
  const disabled = !onTeam && teamFull;
  const label =
    onTeam ? 'Remove from team'
    : disabled ? 'Team full'
    : 'Add to team';

  return (
    <IconButton
      variant='outline'
      title={label}
      aria-label={label}
      aria-pressed={onTeam}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-2 right-2 grid size-7 min-w-0 cursor-pointer place-items-center rounded-full border p-0 text-base leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
        onTeam ?
          'border-ink bg-ink text-surface hover:bg-ink-strong'
        : 'border-line bg-surface text-ink-body hover:bg-subtle disabled:hover:bg-surface'
      }`}>
      {onTeam ? '✓' : '+'}
    </IconButton>
  );
};
