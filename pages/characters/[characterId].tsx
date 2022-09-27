import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FilterCharactersByNameDocument,
  FilterCharactersByNameQuery,
  FilterCharactersByNameQueryVariables,
  GetCharacterByIdDocument,
  GetCharacterByIdQuery,
  GetCharacterByIdQueryVariables,
} from '../../generated/graphql';
import { initializeApollo } from '../../lib/graphql-client';

export type CharacterProps = Pick<GetCharacterByIdQuery, 'character'>;

function Character({ character }: CharacterProps) {
  return (
    <article>
      <Button colorScheme="green" size="lg" ml="4rem" mt="2rem">
        <Link href="/" passHref>
          <a>Back to Home</a>
        </Link>
      </Button>
      <Flex
        alignItems="center"
        justifyContent="center"
        width="fit-content"
        mx="auto"
        gap={20}
        mt="6rem"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          src={character?.image!}
          alt={character?.name!}
          width={350}
          height={275}
        />
        <Flex direction="column" mr="1.5rem">
          <Heading as="h2" color="green.300">
            {character?.name}
          </Heading>
          <Text fontSize="2xl">
            <Text as="b">Origin:</Text> {character?.origin?.name}
          </Text>
          <Text fontSize="2xl">
            <Text as="b">Status:</Text> {character?.status}
          </Text>
          <Text fontSize="2xl">
            <Text as="b">Gender:</Text> {character?.gender}
          </Text>
        </Flex>
      </Flex>
    </article>
  );
}

export default Character;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const apolloClient = initializeApollo();

  // pre-generate the first 20 characters
  const { data } = await apolloClient.query<
    FilterCharactersByNameQuery,
    FilterCharactersByNameQueryVariables
  >({
    query: FilterCharactersByNameDocument,
  });

  const paths =
    data.characters?.results?.map((character) => ({
      params: { characterId: character?.id as string },
    })) ?? [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();
  const { characterId } = ctx.params!;

  const { data } = await apolloClient.query<
    GetCharacterByIdQuery,
    GetCharacterByIdQueryVariables
  >({
    query: GetCharacterByIdDocument,
    variables: {
      id: characterId as string,
    },
  });

  return {
    props: {
      character: data.character,
    },
  };
};
