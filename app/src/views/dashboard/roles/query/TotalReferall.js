import React from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { PhoneForwarded } from "react-feather";

const CASES_BY_AGE = gql`
  {
    totalLvformReferallRecords{
      dcount
    }
  }
`;

export function ReferallCases() {
  const { loading, error, data } = useQuery(CASES_BY_AGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  const { dcount } = data.totalLvformReferallRecords;

  return (
    <SimpleAnalipticCard
      icon={<PhoneForwarded className="text-success" size={15} />}
      stat={dcount}
      statTitle="Referall cases"
      type="area"
    />
  );
}
