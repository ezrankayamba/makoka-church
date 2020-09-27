import React from "react";
import { KPI_SUMMARY } from "../../helpers/ReportsGraphQL";
import { useQuery } from "@apollo/react-hooks";
import PieChart from "../../components/graph/PieChart";
import useProfile from "../../components/hooks/useProfile";
import BarGraph from "../../components/graph/BarGraph";
import { ColorsHelper } from "../../helpers/ColorsHelper";

function ComplaintsKPIGraph() {
  useProfile();
  const { loading, data, error } = useQuery(KPI_SUMMARY);
  if (loading) return null;
  if (error) return null;
  console.log(data);
  let allProps = {
    backgroundColor: "rgba(255, 212, 0, .5)",
    borderWidth: 1,
  };
  let placeHolder = [
    { name: "1 week", count: 0 },
    { name: "2 weeks", count: 0 },
    { name: "3-4 weeks", count: 0 },
    { name: "5-6 weeks", count: 0 },
    { name: "7-8 weeks", count: 0 },
    { name: "Above 8 weeks", count: 0 },
  ];
  console.log(data.kpiSummary);

  let natureList = data.kpiSummary
    .map((d) => d.natureName)
    .filter((v, i, a) => a.indexOf(v) === i);
  let res = natureList.map((nat) => {
    return {
      label: nat,
      backgroundColor: ColorsHelper.randomColor(),
      data: placeHolder.map((p) => {
        let x = data.kpiSummary.find(
          (d) => d.natureName === nat && d.name === p.name
        );
        return x ? x.count : 0;
      }),
    };
  });

  const meta = {
    data: res,
    labels: placeHolder.map((r) => r.name),
    beginAtZero: true,
  };

  return (
    <BarGraph
      stacked={true}
      meta={meta}
      title="Complaints KPI"
      graphId="complaints-kpi-summary"
    />
  );
}

export default ComplaintsKPIGraph;
