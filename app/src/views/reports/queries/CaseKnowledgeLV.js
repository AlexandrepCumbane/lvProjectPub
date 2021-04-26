import React from "react";
import { useQuery, gql } from "@apollo/client";
import DountChart from "../charts/Dounts";

const CASES_BY_KNOWLEDGE = gql`
  {
    allCasesKnowledgeAbout {
      howKnowsLv
      dcount
    }
  }
`;

export function CasesByKnowLedge(props) {
  const { loading, error, data } = useQuery(CASES_BY_KNOWLEDGE, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesKnowledgeAbout.forEach((element) => {
    if (element.howKnowsLv && element.dcount) {
      category.push(props.translate(element.howKnowsLv));
      datas.push(Number(element.dcount));
    }
  });

  return <DountChart series={datas} labels={category} />;
}
