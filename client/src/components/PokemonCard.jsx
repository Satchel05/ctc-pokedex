import { StatRadar } from './StatRadar';
import { TeamToggleButton } from './TeamToggleButton';
import { useArtColors } from '../lib/useArtColors';

const title = (s) =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const PokemonCard = ({ pokemon, onTeam = false, teamFull = false, onToggleTeam }) => {
  const { id, name, sprite_url, types, stats } = pokemon;
  // Tint from the sprite's own colours; until sampled (or if it fails), use the type colour.
  const sampled = useArtColors(sprite_url);
  const typeColor = `var(--type-${types[0]?.name}, var(--type-normal))`;
  const tint = {
    '--c1': sampled?.primary ?? typeColor,
    '--c2': sampled?.secondary ?? typeColor,
  };

  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);
  const displayName = title(name);

  return (
    <article
      style={tint}
      className={`card-tint flex flex-col overflow-hidden rounded-lg border transition-colors hover:border-line-strong ${
        onTeam ? 'border-line-strong' : 'border-line'
      }`}>
      {/* Artwork */}
      <div className='relative aspect-[16/10] overflow-hidden'>
        <span className='absolute top-2.5 left-3 text-xs font-medium text-ink-body tabular-nums'>
          #{String(id).padStart(3, '0')}
        </span>

        <img
          src={sprite_url}
          alt={displayName}
          loading='lazy'
          crossOrigin='anonymous'
          className='absolute top-[2%] left-[12%] h-[82%] w-[76%] object-contain'
        />

        <TeamToggleButton
          onTeam={onTeam}
          teamFull={teamFull}
          onClick={onToggleTeam}
        />

        <div className='absolute right-3 bottom-2.5 left-3 flex items-end justify-between gap-2 leading-[1.3]'>
          <div className='flex min-w-0 flex-col'>
            <h2 className='truncate text-[15px] font-semibold text-ink'>{displayName}</h2>
            <span className='text-xs text-ink-body'>{types.map((t) => title(t.name)).join(' · ')}</span>
          </div>
          <div className='flex flex-col items-end'>
            <span className='text-[15px] font-semibold text-ink tabular-nums'>{total}</span>
            <span className='text-xs text-ink-body'>BST</span>
          </div>
        </div>
      </div>

      {/* Stat radar */}
      <div className='flex-1 px-3 pt-3 pb-3'>
        <StatRadar stats={stats} />
      </div>
    </article>
  );
};
