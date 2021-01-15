// import { gql } from "@apollo/client";\

import React from "react";
import { graphClient } from "../../configs/apolloConfig";

import { useQuery, gql } from "@apollo/client";

graphClient
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then((result) => console.log(result));

/**
 * graphQl functions
 */

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "MZN") {
      currency
      rate
      name
    }
  }
`;

export function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate, name }) => (
    <div key={currency}>
      <p>
        {currency}: {rate} : {name}
      </p>
    </div>
  ));
}
