import { Card, Image, Button, Badge, Progress, HStack } from '@chakra-ui/react';

export const PokemonCard = ({ pokemon }) => {
  const { name, spriteURL, types, numeral, abilities, hp, attack, defense } =
    pokemon;

  const stats = { hp, attack, defense };

  return (
    <Card.Root>
      <Card.Header>#{numeral}</Card.Header>
      <Card.Body>
        <Image
          boxSize='150px'
          src={spriteURL}
        />
        <Card.Title>{name}</Card.Title>
        {types.map((type) => (
          <Badge key={type}>{type}</Badge>
        ))}
        {Object.entries(stats).map(([label, value]) => {
          return (
            <Progress.Root>
              <HStack gap='5'>
                <Progress.Label>{label}</Progress.Label>
                <Progress.Track flex='1'>
                  <Progress.Range />
                </Progress.Track>
                <Progress.ValueText>{value}</Progress.ValueText>
              </HStack>
            </Progress.Root>
          );
        })}
        {abilities.map((ability) => (
          <Badge key={ability}>{ability}</Badge>
        ))}
      </Card.Body>

      <Card.Footer>
        <Button>Add to team</Button>
      </Card.Footer>
    </Card.Root>
  );
};
