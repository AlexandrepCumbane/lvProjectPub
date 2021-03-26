import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import * as Icon from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
    withoutFeedbackFpPartner(id: "${id}"){
      dcount,
    }
  }
`;

export function NoFeedbackFocalPointPartner(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""), {
    pollInterval: 50000,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="danger"
        icon={<Icon.ThumbsDown className="text-danger" size={15} />}
        stat="0"
        statTitle={context.translate("Without Feedback - Partner")}
        type="area"
      />
    );

  const { dcount } = data.withoutFeedbackFpPartner;

  return (
    <SimpleAnalipticCard
      iconBg="danger"
      icon={<Icon.ThumbsDown className="text-danger" size={15} />}
      stat={dcount}
      statTitle={context.translate("Without Feedback - Partner")}
      type="area"
    />
  );
}
