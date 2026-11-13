// import { useAuth } from '../contexts/AuthContext';

const getFirstName = (user, profile) => {
  const name = profile?.name || user?.displayName || user?.email;
  if (!name) return null;
  return name.includes('@') ? name.split('@')[0] : name.split(' ')[0];
};

export const PageHero = ({ title, subtitle }) => {
  // const { user, profile } = useAuth();
  // const firstName = user && getFirstName(user, profile);

  // TODO: delete this line after useAuth is implemented and uncomment the above lines
  const firstName = 'Fix me! 🔨';

  return (
    <div className='flex flex-col items-center gap-7 pt-26 text-center'>
      {firstName && (
        <p className='-mb-2 text-xl font-medium text-ink-muted'>
          Welcome back, <span className='text-ink-body'>{firstName}</span>
        </p>
      )}
      <h1 className='text-[clamp(48px,7vw,88px)] leading-[1.05] font-extrabold tracking-[-0.005em] text-balance text-ink'>
        {title}
      </h1>
      {subtitle && (
        <p className='text-lg leading-[1.55] text-ink-body'>{subtitle}</p>
      )}
    </div>
  );
};
