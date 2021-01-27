import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { useApollo } from "../utils/apolloClient";

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
