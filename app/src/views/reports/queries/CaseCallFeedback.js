import React from "react";
import { useQuery, gql } from "@apollo/client";
import PieChart from "../charts/Pie";

const choices = {
  1: "Muito Satisfeito",
  2: "Satisfeito",
  3: "Neutro",
  4: "Insatisfeito",
  5: "Muito insatisfeito",
};
const CASES_BY_CALL_FEEDBACK = gql`
  {
    allCasesCallFeedback {
      callFeedback
      dcount
    }
  }
`;

export function CasesByCallFeedback() {
  const { loading, error, data } = useQuery(CASES_BY_CALL_FEEDBACK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesCallFeedback.forEach((element) => {
    if (element.callFeedback) {
      category.push(choices[element.callFeedback]);
      datas.push(Number(element.dcount));
    }
  });

  return <PieChart series={datas} labels={category} />;
}
