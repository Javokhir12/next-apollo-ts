import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/graphql-client';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialApolloState: any }>) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />;
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
