import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { Sun } from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
    dailyCases(id: "${id}"){
      dcount,
      name
    }
  }
`;

export function DailyCases(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""), {
    pollInterval: 5000,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="warning"
        icon={<Sun className="text-warning" size={15} />}
        stat="0"
        statTitle={context.translate("Daily Cases")}
        type="area"
      />
    );

  const { dcount } = data.dailyCases;

  return (
    <SimpleAnalipticCard
      iconBg="warning"
      icon={<Sun className="text-warning" size={15} />}
      stat={dcount}
      statTitle={context.translate("Daily Cases")}
      type="area"
    />
  );
}
