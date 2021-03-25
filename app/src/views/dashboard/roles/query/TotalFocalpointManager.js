import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import * as Icon from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
  totalReceivedFpManager(id: "${id}"){
      dcount,
    }
  }
`;

export function TotalFocalPointManager(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""));
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="info"
        icon={<Icon.Archive className="text-info" size={15} />}
        stat="0"
        statTitle={context.translate("All Cases - Manager")}
        type="area"
      />
    );

  const { dcount } = data.totalReceivedFpManager;

  return (
    <SimpleAnalipticCard
      iconBg="info"
      icon={<Icon.Archive className="text-info" size={15} />}
      stat={dcount}
      statTitle={context.translate("All Cases - Manager")}
      type="area"
    />
  );
}
