import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Heading,
  Container,
  Spinner,
  Box,
  Flex,
  Button,
  Spacer,
} from '@chakra-ui/react';
import {
  FilterCharactersByNameDocument,
  useFilterCharactersByNameQuery,
} from '../generated/graphql';
import { initializeApollo } from '../lib/graphql-client';
import Search from '../components/Search';
import CharactersList from '../components/CharactersList';

const Home: NextPage = () => {
  const { data, loading, error, refetch } = useFilterCharactersByNameQuery({
    notifyOnNetworkStatusChange: true,
  });

  const handleNext = () => {
    refetch({
      page: data?.characters?.info?.next,
    });
  };

  const handlePrev = () => {
    refetch({
      page: data?.characters?.info?.prev,
    });
  };

  return (
    <>
      <Head>
        <title>Rick & Morty | Home</title>
        <meta
          name="description"
          content="Rick & Morty app with NextJS + Apollo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="4xl" my="2rem" mx="auto">
        <Heading mb="3rem" textAlign="center" color="green.300">
          Rick && Morty
        </Heading>
        <Search refetch={refetch} />

        {loading && !data && renderLoadingUI()}
        {error ? renderErrorUI(error) : null}
        {data ? <CharactersList characters={data.characters} /> : null}

        <Flex mt="1.2rem">
          <Button
            colorScheme="green"
            size="lg"
            ml="4rem"
            mt="2rem"
            disabled={!data?.characters?.info?.prev}
            onClick={handlePrev}
          >
            Previous
          </Button>
          <Spacer />
          <Button
            colorScheme="green"
            size="lg"
            ml="4rem"
            mt="2rem"
            disabled={!data?.characters?.info?.next}
            onClick={handleNext}
          >
            Next
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FilterCharactersByNameDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60,
  };
}

function renderLoadingUI() {
  return (
    <Box
      display="flex"
      w="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="green.400" size="xl" thickness="0.3rem" />;
    </Box>
  );
}

function renderErrorUI(error: { message: string; [key: string]: any }) {
  return (
    <Heading mb="3rem" textAlign="center" color="red.400">
      {error.message} :/
    </Heading>
  );
}
