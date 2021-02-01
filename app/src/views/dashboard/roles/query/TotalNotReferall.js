import React from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { PhoneMissed } from "react-feather";

const CASES_BY_AGE = gql`
  {
    totalLvformNotReferallRecords {
      dcount
    }
  }
`;

export function NotReferallCases() {
  const { loading, error, data } = useQuery(CASES_BY_AGE);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<PhoneMissed className="text-danger" size={15} />}
        stat="0"
        statTitle="Not referred cases"
        type="area"
      />
    );

  const { dcount } = data.totalLvformNotReferallRecords;

  return (
    <SimpleAnalipticCard
      icon={<PhoneMissed className="text-danger" size={15} />}
      stat={dcount}
      statTitle="Not referred cases"
      type="area"
    />
  );
}
