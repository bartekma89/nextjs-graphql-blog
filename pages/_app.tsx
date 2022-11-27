import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { apolloClient } from "../graphql/apolloClient";
import { Layout } from "../components";

import "../styles/globals.scss";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
