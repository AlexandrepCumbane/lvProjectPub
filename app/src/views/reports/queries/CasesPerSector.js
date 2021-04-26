import React from "react";
import { useQuery, gql } from "@apollo/client";
import ColumnChart from "../charts/Column";

const CASES_BY_SECTOR = gql`
  {
    allCasesSector {
      sector
      dcount
    }
  }
`;

export function CasesBySector(props) {
  const { loading, error, data } = useQuery(CASES_BY_SECTOR, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesSector.forEach((element) => {
    category.push(props.translate(element.sector));
    datas.push(element.dcount);
  });

  return (
    <ColumnChart
      options={{
        color: "#d9eb55",
        title: "CASE TYPE",
        categories: category,
        data: datas,
      }}
    />
  );
}
