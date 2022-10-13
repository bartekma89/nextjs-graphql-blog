import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
