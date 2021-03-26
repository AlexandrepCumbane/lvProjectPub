import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { PhoneForwarded } from "react-feather";
import { IntlContext } from "../../../../i18n";

const CASES_BY_AGE = gql`
  {
    totalLvformReferallRecords {
      dcount
    }
  }
`;

export function ReferallCases() {
  const { loading, error, data } = useQuery(CASES_BY_AGE, {
    pollInterval: 5000,
  });

  const context = useContext(IntlContext);
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<PhoneForwarded className="text-success" size={15} />}
        stat="0"
        statTitle={context.translate("Referred cases")}
        type="area"
      />
    );

  const { dcount } = data.totalLvformReferallRecords;

  return (
    <SimpleAnalipticCard
      icon={<PhoneForwarded className="text-success" size={15} />}
      stat={dcount}
      statTitle={context.translate("Referred cases")}
      type="area"
    />
  );
}
