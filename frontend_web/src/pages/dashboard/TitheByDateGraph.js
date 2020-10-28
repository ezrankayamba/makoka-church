import React from "react";
import { REVENUE_SUMMARY, TITHE_SUMMARY } from "../../helpers/ReportsGraphQL";
import { useQuery } from "@apollo/react-hooks";
import BarGraph from "../../components/graph/BarGraph";
import useProfile from "../../components/hooks/useProfile";
import { ColorsHelper } from "../../helpers/ColorsHelper";

function TitheByDateGraph(props) {
  useProfile();
  const { loading, data, error } = useQuery(TITHE_SUMMARY);
  if (loading) return 'Loading ...';
  if (error) return 'Error!';
  console.log(data);
  console.log(data.titheSummary);

  let titheList = data.titheSummary
    .map((d) => {
      return d.date;
    })
    .filter((v, i, a) => a.indexOf(v) === i);
  let res = [{
    label: 'Tithe count',
    backgroundColor: ColorsHelper.randomColor(),
    data: data.titheSummary.map(d => d.total)
  }];

  const meta = {
    data: res,
    labels: titheList.map((r) => r),
    beginAtZero: true,
  };
  console.log(meta)
  return (
    <BarGraph
      stacked={false}
      meta={meta}
      title="Tithe By Date"
      graphId="tithe-date-summary"
    />
  );
}

export default TitheByDateGraph;
