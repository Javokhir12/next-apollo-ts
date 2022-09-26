import { SimpleGrid } from '@chakra-ui/react';
import { FilterCharactersByNameQuery } from '../generated/graphql';
import CharacterCard from './CharacterCard';

export type CharactersListPorps = Pick<
  FilterCharactersByNameQuery,
  'characters'
>;

function CharactersList({ characters }: CharactersListPorps) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {characters?.results?.map((character) => (
        <CharacterCard
          key={character?.id}
          name={character?.name!}
          src={character?.image!}
        />
      ))}
    </SimpleGrid>
  );
}

export default CharactersList;
