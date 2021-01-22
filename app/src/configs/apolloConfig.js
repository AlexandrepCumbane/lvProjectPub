import { ApolloClient, InMemoryCache } from "@apollo/client";



export const graphClient = new ApolloClient({
 
  cache: new InMemoryCache(),
});
