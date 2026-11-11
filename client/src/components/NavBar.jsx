import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { PageContainer } from './PageContainer';
import { TeamButton } from './TeamButton';
import logo from '../assets/ctc-logo-purple.svg';
import logoLight from '../assets/ctc-logo-purple-light.svg';
import { useAuth } from '../contexts/AuthContext';

// Primary nav: logo + wordmark on the left, Team pill on the right.
export const NavBar = ({ teamCount = 0 }) => {
  const { user, loading, login, logout } = useAuth();

  return (
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
            <span className='text-[15px] font-bold tracking-[-0.01em] text-ink'>
              Pokédex
            </span>
          </Link>
          {!loading && (
            <div className='flex items-center gap-3'>
              {user ?
                <>
                  <TeamButton count={teamCount} />
                  <Button
                    variant='ghost'
                    onClick={logout}
                    className='h-10 cursor-pointer rounded-full px-3.5 text-sm font-semibold text-ink-body hover:bg-subtle'>
                    Sign out
                  </Button>
                </>
              : <Button
                  variant='outline'
                  onClick={login}
                  className='h-10 cursor-pointer rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:border-line-strong hover:bg-subtle active:scale-[0.97]'>
                  Sign in
                </Button>
              }
            </div>
          )}
        </div>
      </PageContainer>
    </nav>
  );
};
