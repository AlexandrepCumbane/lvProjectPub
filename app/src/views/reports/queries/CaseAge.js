import React from "react";
import { useQuery, gql } from "@apollo/client";
import DountChart from "../charts/Dounts";

const CASES_BY_AGE = gql`
  {
    allCasesAge {
      ageGroup
      dcount
    }
  }
`;

export function CasesByAge() {
  const { loading, error, data } = useQuery(CASES_BY_AGE, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesAge.forEach((element) => {
    category.push(element.ageGroup);
    datas.push(Number(element.dcount));
  });

  return <DountChart series={datas} labels={category} />;
}
