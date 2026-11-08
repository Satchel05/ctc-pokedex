import {
  Card,
  Image,
  Button,
  Badge,
  Progress,
  HStack,
  Wrap,
} from '@chakra-ui/react';

// Highest possible base stat in the games; used to scale the progress bars.
const MAX_BASE_STAT = 255;

export const PokemonCard = ({ pokemon }) => {
  const { id, name, sprite_url, types, stats, abilities } = pokemon;

  return (
    <Card.Root>
      <Card.Header>#{id}</Card.Header>
      <Card.Body>
        <Image
          boxSize='150px'
          src={sprite_url}
          alt={name}
        />
        <Card.Title textTransform='capitalize'>{name}</Card.Title>

        <Wrap gap='2' my='2'>
          {types.map((type) => (
            <Badge key={type.id}>{type.name}</Badge>
          ))}
        </Wrap>

        {stats.map((stat) => (
          <Progress.Root
            key={stat.id}
            value={stat.base_stat}
            max={MAX_BASE_STAT}
            size='sm'
          >
            <HStack gap='5'>
              <Progress.Label minW='9rem'>{stat.name}</Progress.Label>
              <Progress.Track flex='1'>
                <Progress.Range />
              </Progress.Track>
              <Progress.ValueText>{stat.base_stat}</Progress.ValueText>
            </HStack>
          </Progress.Root>
        ))}

        <Wrap gap='2' mt='3'>
          {abilities.map((ability) => (
            <Badge
              key={ability.id}
              variant='outline'
              colorPalette={ability.is_hidden ? 'purple' : 'gray'}
            >
              {ability.name}
              {ability.is_hidden && ' (hidden)'}
            </Badge>
          ))}
        </Wrap>
      </Card.Body>

      <Card.Footer>
        <Button>Add to team</Button>
      </Card.Footer>
    </Card.Root>
  );
};
