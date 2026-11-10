import { Link } from 'react-router-dom';
import { PageContainer } from './PageContainer';
import { TeamButton } from './TeamButton';
import logo from '../assets/ctc-logo-purple.svg';
import logoLight from '../assets/ctc-logo-purple-light.svg';

// Primary nav: logo + wordmark on the left, Team pill on the right.
export const NavBar = ({ teamCount = 0 }) => (
  <nav
    aria-label='Primary'
    className='relative z-20'>
    <PageContainer>
      <div className='mt-3 flex h-15 items-center justify-between gap-6'>
        <Link
          to='/'
          className='flex items-center gap-2.5'>
          <img
            src={logo}
            alt='Commit the Change'
            className='h-6 w-auto dark:hidden'
          />
          <img
            src={logoLight}
            alt='Commit the Change'
            className='hidden h-6 w-auto dark:block'
          />
          <span className='text-[15px] font-bold tracking-[-0.01em] text-ink'>Pokédex</span>
        </Link>
        <TeamButton count={teamCount} />
      </div>
    </PageContainer>
  </nav>
);
