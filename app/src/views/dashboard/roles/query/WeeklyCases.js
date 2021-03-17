import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { Cloud } from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
  weeklyCases(id: "${id}"){
      dcount,
      name
    }
  }
`;

export function WeeklyCases(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""));
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        icon={<Cloud className="text-warning" color="warning" size={15} />}
        stat="0"
        statTitle={context.translate("Weekly Cases")}
        type="area"
      />
    );

  const { dcount } = data.weeklyCases;

  return (
    <SimpleAnalipticCard
      icon={<Cloud className="text-primary" size={15} />}
      stat={dcount}
      statTitle={context.translate("Weekly Cases")}
      type="area"
    />
  );
}
