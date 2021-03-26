import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import * as Icon from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
  totalReceivedPartner(id: "${id}"){
      dcount,
    }
  }
`;

export function TotalPartner(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""), {
    pollInterval: 5000,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="info"
        icon={<Icon.Archive className="text-info" size={15} />}
        stat="0"
        statTitle={context.translate("All Cases")}
        type="area"
      />
    );

  const { dcount } = data.totalReceivedPartner;

  return (
    <SimpleAnalipticCard
      iconBg="info"
      icon={<Icon.Archive className="text-info" size={15} />}
      stat={dcount}
      statTitle={context.translate("All Cases")}
      type="area"
    />
  );
}
