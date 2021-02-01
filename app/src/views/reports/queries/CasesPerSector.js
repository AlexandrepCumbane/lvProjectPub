import React from "react";
import { useQuery, gql } from "@apollo/client";
import ColumnChart from "../charts/Column";

const choices = {
  1: "Resiliência",
  2: "INGC",
  3: "CCCM",
  4: "Protecção",
  5: "Proteção contra Exploração e Abuso Sexual",
  6: "Proteção a criança",
  7: "Saúde",
  8: "Educação",
  9: "Agua, saneamento e Higiene",
  10: "Abrigo",
  11: "Violência baseada no gênero",
  12: "Segurança Alimentar",
  13: "Outro",
};

const CASES_BY_SECTOR = gql`
  {
    allCasesSector {
      sector
      dcount
    }
  }
`;

export function CasesBySector() {
  const { loading, error, data } = useQuery(CASES_BY_SECTOR);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesSector.forEach((element) => {
    category.push(choices[element.sector]);
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
