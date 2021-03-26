import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { Phone } from "react-feather";
import { IntlContext } from "../../../../i18n";

const CASES_BY_AGE = gql`
  {
    totalLvformRecords {
      dcount
    }
  }
`;

export function AllCases() {
  const { loading, error, data } = useQuery(CASES_BY_AGE, {
    pollInterval: 5000,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<Phone className="text-primary" size={15} />}
        stat="0"
        statTitle={context.translate("Total Cases")}
        type="area"
      />
    );

  const { dcount } = data.totalLvformRecords;

  return (
    <SimpleAnalipticCard
      icon={<Phone className="text-primary" size={15} />}
      stat={dcount}
      statTitle={context.translate("Total Cases")}
      type="area"
    />
  );
}
