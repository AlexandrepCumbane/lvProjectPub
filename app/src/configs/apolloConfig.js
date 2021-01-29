import { ApolloClient, InMemoryCache } from "@apollo/client";



export const graphClient = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  cache: new InMemoryCache(),
});
