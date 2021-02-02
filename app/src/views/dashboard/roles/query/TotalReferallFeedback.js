import React from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { PhoneCall } from "react-feather";

const CASES_BY_AGE = gql`
  {
    totalLvformWithFeedbackRecords {
      dcount
    }
  }
`;

export function FeedbackCases() {
  const { loading, error, data } = useQuery(CASES_BY_AGE);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<PhoneCall className="text-success" size={15} />}
        stat="0"
        statTitle="Cases with Feedback"
        type="area"
      />
    );

  const { dcount } = data.totalLvformWithFeedbackRecords;

  return (
    <SimpleAnalipticCard
      icon={<PhoneCall className="text-success" size={15} />}
      stat={dcount}
      statTitle="Cases with Feedback"
      type="area"
    />
  );
}
