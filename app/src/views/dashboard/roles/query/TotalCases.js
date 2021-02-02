import React from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { Phone } from "react-feather";

const CASES_BY_AGE = gql`
  {
    totalLvformRecords {
      dcount
    }
  }
`;

export function DailyCases() {
  const { loading, error, data } = useQuery(CASES_BY_AGE);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<Phone className="text-primary" size={15} />}
        stat="0"
        statTitle="Total Cases"
        type="area"
      />
    );

  const { dcount } = data.totalLvformRecords;

  return (
    <SimpleAnalipticCard
      icon={<Phone className="text-primary" size={15} />}
      stat={dcount}
      statTitle="Total Cases"
      type="area"
    />
  );
}
