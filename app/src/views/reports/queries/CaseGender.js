import React from "react";
import { useQuery, gql } from "@apollo/client";
import DountChart from "../charts/Dounts";

const choices = {
  male: "Male",
  female: "Female",
  other: "Not specified",
};
const CASES_BY_AGE = gql`
  {
    allCasesGender {
      gender
      dcount
    }
  }
`;

export function CasesByGender(props) {
  const { loading, error, data } = useQuery(CASES_BY_AGE, {
    pollInterval: 50000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  let category = [];
  let datas = [];

  data.allCasesGender.forEach((element) => {
    category.push(props.translate(choices[element.gender]));
    datas.push(Number(element.dcount));
  });

  return <DountChart series={datas} labels={category} />;
}
