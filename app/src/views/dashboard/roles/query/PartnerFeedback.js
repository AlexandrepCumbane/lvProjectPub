import React from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { PhoneMissed } from "react-feather";
import { IntlContext } from "../../../../i18n";
import { useContext } from "react";

const CASES_BY_AGE = gql`
  {
    allCasesCallFeedbackPartner {
      dcount
    }
  }
`;

export function FeedbackPartner() {
  const { loading, error, data } = useQuery(CASES_BY_AGE, {
    pollInterval: 5000,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<PhoneMissed className="text-danger" size={15} />}
        stat="0"
        statTitle={context.translate("Not referred cases")}
        type="area"
      />
    );

  const { dcount } = data.allCasesCallFeedbackPartner;

  return (
    <SimpleAnalipticCard
      icon={<PhoneMissed className="text-danger" size={15} />}
      stat={dcount}
      statTitle={context.translate("Not referred cases")}
      type="area"
    />
  );
}
