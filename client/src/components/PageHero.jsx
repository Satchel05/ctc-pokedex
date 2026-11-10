// Centred hero title + subtitle.
export const PageHero = ({ title, subtitle }) => (
  <div className='flex flex-col items-center gap-7 pt-26 text-center'>
    <h1 className='text-[clamp(48px,7vw,88px)] leading-[1.05] font-extrabold tracking-[-0.005em] text-balance text-ink'>
      {title}
    </h1>
    {subtitle && <p className='text-lg leading-[1.55] text-ink-body'>{subtitle}</p>}
  </div>
);
