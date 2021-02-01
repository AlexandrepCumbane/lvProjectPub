import { ApolloClient, InMemoryCache } from "@apollo/client";



export const graphClient = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}graphql/`,
  cache: new InMemoryCache(),
});
