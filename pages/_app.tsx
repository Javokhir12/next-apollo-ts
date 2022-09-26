import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/graphql-client';
import '../styles/globals.css';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialApolloState: any }>) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}

export default MyApp;
