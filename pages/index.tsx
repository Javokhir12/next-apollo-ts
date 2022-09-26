import type { NextPage } from 'next';
import Head from 'next/head';
import {
  GetCharactersDocument,
  useGetCharactersQuery,
} from '../generated/graphql';
import { initializeApollo } from '../lib/graphql-client';

const Home: NextPage = () => {
  const { data, loading, error } = useGetCharactersQuery({
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h2>Error :(</h2>;

  return (
    <div>
      <Head>
        <title>Rick & Morty | Home</title>
        <meta
          name="description"
          content="Rick & Morty app with NextJS + Apollo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data?.characters?.results?.map((character) => (
        <li key={character?.id}>{character?.name}</li>
      ))}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetCharactersDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60,
  };
}
