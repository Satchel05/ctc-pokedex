import pokeball from '../assets/pokeball.svg';

// Spinning pokeball; pulses instead when the user prefers reduced motion.
export const PokeballLoader = ({ label = 'Loading Pokémon', size = 112, fullPage = false }) => (
  <div
    role='status'
    aria-live='polite'
    className={`flex flex-col items-center justify-center ${fullPage ? 'min-h-screen' : 'min-h-80'}`}>
    <img
      src={pokeball}
      alt=''
      width={size}
      height={size}
      className='animate-pokeball-spin motion-reduce:animate-pokeball-pulse'
    />
    <span className='sr-only'>{label}</span>
  </div>
);
