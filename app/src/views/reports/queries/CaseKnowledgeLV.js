import React from "react";
import { useQuery, gql } from "@apollo/client";
import PieChart from "../charts/Pie";

const choices = {
  1: "Radio",
  2: "Panfletos",
  3: "Pessoas trabalhando na comunidade",
  4: "SMS",
  5: "Cartazes ou material de visibilidade",
  6: "Caixa de sugestoes",
};
const CASES_BY_KNOWLEDGE = gql`
  {
    allCasesKnowledgeAbout {
      howKnowsLv
      dcount
    }
  }
`;

export function CasesByKnowLedge() {
  const { loading, error, data } = useQuery(CASES_BY_KNOWLEDGE, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesKnowledgeAbout.forEach((element) => {
    if (element.howKnowsLv) {
      category.push(choices[element.howKnowsLv]);
      datas.push(Number(element.dcount));
    }
  });

  return <PieChart series={datas} labels={category} />;
}
