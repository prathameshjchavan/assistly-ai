"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";

const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
