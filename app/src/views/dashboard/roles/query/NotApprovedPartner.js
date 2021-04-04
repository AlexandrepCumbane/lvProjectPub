import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import * as Icon from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
  notAprovedPartner(id: "${id}"){
      dcount,
    }
  }
`;

export function NotApprovedPartner(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""), {
    pollInterval: 5000,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="danger"
        icon={<Icon.X className="text-danger" size={15} />}
        stat="0"
        statTitle={context.translate("Unapproved Feedback")}
        type="area"
      />
    );

  const { dcount } = data.notAprovedPartner;

  return (
    <SimpleAnalipticCard
      iconBg="danger"
      icon={<Icon.X className="text-danger" size={15} />}
      stat={dcount}
      statTitle={context.translate("Unapproved Feedback")}
      type="area"
    />
  );
}
