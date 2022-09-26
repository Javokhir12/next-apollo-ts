import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Container, SimpleGrid, Spinner, Box } from '@chakra-ui/react';
import {
  GetCharactersDocument,
  useGetCharactersQuery,
} from '../generated/graphql';
import { initializeApollo } from '../lib/graphql-client';
import CharacterCard from '../components/CharacterCard';

const Home: NextPage = () => {
  const { data, loading, error } = useGetCharactersQuery({
    notifyOnNetworkStatusChange: true,
  });

  if (loading)
    return (
      <Box
        display="flex"
        w="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner color="blue.500" size="xl" thickness="0.3rem" />;
      </Box>
    );

  if (error) return <h2>Error :(</h2>;

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
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {data?.characters?.results?.map((character) => (
            <CharacterCard
              key={character?.id}
              name={character?.name!}
              src={character?.image!}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Home;

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: GetCharactersDocument,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 60,
//   };
// }
