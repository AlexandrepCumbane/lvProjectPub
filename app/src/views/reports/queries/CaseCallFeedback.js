import React from "react";
import { useQuery, gql } from "@apollo/client";
import PieChart from "../charts/Pie";

const CASES_BY_CALL_FEEDBACK = gql`
  {
    allCasesCallFeedback {
      callFeedback
      dcount
    }
  }
`;

export function CasesByCallFeedback(props) {
  const { loading, error, data } = useQuery(CASES_BY_CALL_FEEDBACK, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesCallFeedback.forEach((element) => {
    if (element.callFeedback) {
      category.push(props.translate(element.callFeedback));
      datas.push(Number(element.dcount));
    }
  });

  return <PieChart series={datas} labels={category} />;
}
