import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import SimpleAnalipticCard from "../../../../components/custom/statisticCards/Card";
import { Globe } from "react-feather";
import { IntlContext } from "../../../../i18n";

const QUERY = (id) => gql`
{
  annualCases(id: "${id}"){
      dcount,
      name
    }
  }
`;

export function AnnualCases(props) {
  const { loading, error, data } = useQuery(QUERY(props.userInfo ?? ""));
  const context = useContext(IntlContext);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SimpleAnalipticCard
        iconBg="success"
        icon={<Globe className="text-success" size={15} />}
        stat="0"
        statTitle={context.translate("Annual Cases")}
        type="area"
      />
    );

  const { dcount } = data.annualCases;

  return (
    <SimpleAnalipticCard
      iconBg="success"
      icon={<Globe className="text-success" size={15} />}
      stat={dcount}
      statTitle={context.translate("Annual Cases")}
      type="area"
    />
  );
}
