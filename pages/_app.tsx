import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import { apolloClient } from "../graphql/apolloClient";
import { Layout } from "../components";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
