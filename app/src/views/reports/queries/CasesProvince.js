import React from "react";
import { useQuery, gql } from "@apollo/client";
import ColumnChart from "../charts/Column";

const CASES_BY_PROVINCE = gql`
  {
    allCasesProvinces {
      id
      name
      lvformSet {
        id
      }
    }
  }
`;

export function CasesByProvince() {
  const { loading, error, data } = useQuery(CASES_BY_PROVINCE, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesProvinces.forEach((element) => {
    category.push(element.name);
    datas.push(element.lvformSet.length);
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
