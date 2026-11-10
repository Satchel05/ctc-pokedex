import { Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import pokeball from '../assets/pokeball.svg';

export const TEAM_SIZE = 6;

// Chakra Button for behaviour (focus ring, states); Tailwind classes for the look.
export const TeamButton = ({ count = 0 }) => {
  const navigate = useNavigate();
  const onTeam = useLocation().pathname === '/team';

  return (
    <Button
      variant='outline'
      onClick={() => navigate(onTeam ? '/' : '/team')}
      aria-label={`Team, ${count} of ${TEAM_SIZE}`}
      aria-current={onTeam ? 'page' : undefined}
      className={`flex h-10 cursor-pointer items-center gap-2 rounded-full border pr-3.5 pl-2.5 text-sm font-semibold text-ink transition-colors hover:border-line-strong hover:bg-subtle active:scale-[0.97] ${
        onTeam ? 'border-line-strong bg-subtle' : 'border-line bg-surface'
      }`}>
      <img
        src={pokeball}
        alt=''
        className='size-5.5'
      />
      Team
    </Button>
  );
};
