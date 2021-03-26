import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { Calendar } from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
  monthlyCases(id: "${id}"){
      dcount,
      name
    }
  }
`;

export function MonthlyCases(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""), {
    pollInterval: 1500,
  });
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="secondary"
        icon={<Calendar className="text-secondary" size={15} />}
        stat="0"
        statTitle={context.translate("Monthly Cases")}
        type="area"
      />
    );

  const { dcount } = data.monthlyCases;

  return (
    <SimpleAnalipticCard
      iconBg="info"
      icon={<Calendar className="text-info" size={15} />}
      stat={dcount}
      statTitle={context.translate("Monthly Cases")}
      type="area"
    />
  );
}
