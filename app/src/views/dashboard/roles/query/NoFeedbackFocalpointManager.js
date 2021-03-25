import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import * as Icon from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
    withoutFeedbackFpManager(id: "${id}"){
      dcount,
    }
  }
`;

export function NoFeedbackFocalPointManager(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""));
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="danger"
        icon={<Icon.ThumbsDown className="text-danger" size={15} />}
        stat="0"
        statTitle={context.translate("Without Feedback - Manager")}
        type="area"
      />
    );

  const { dcount } = data.withoutFeedbackFpManager;

  return (
    <SimpleAnalipticCard
      iconBg="danger"
      icon={<Icon.ThumbsDown className="text-danger" size={15} />}
      stat={dcount}
      statTitle={context.translate("Without Feedback - Manager")}
      type="area"
    />
  );
}
