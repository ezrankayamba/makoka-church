import React from "react";
import { REVENUE_SUMMARY } from "../../helpers/ReportsGraphQL";
import { useQuery } from "@apollo/react-hooks";
import BarGraph from "../../components/graph/BarGraph";
import useProfile from "../../components/hooks/useProfile";
import { ColorsHelper } from "../../helpers/ColorsHelper";

function RevenueByDateGraph(props) {
  useProfile();
  const { loading, data, error } = useQuery(REVENUE_SUMMARY);
  if (loading) return 'Loading ...';
  if (error) return 'Error!';
  console.log(data);

  let placeHolder = [
    { cat: "ZAKA", total: 0 },
    { cat: "SADAKA", total: 0 },
  ];
  console.log(data.revenueSummary);

  let revenueList = data.revenueSummary
    .map((d) => {
      return d.date;
    })
    .filter((v, i, a) => a.indexOf(v) === i);
  let res = placeHolder.map((s) => {
    return {
      label: s.cat,
      backgroundColor: ColorsHelper.randomColor(),
      data: revenueList.map((p) => {
        let x = data.revenueSummary.find(
          (d) => d.date === p && d.cat === s.cat
        );
        return x ? x.total : 0;
      }),
    };
  });

  const meta = {
    data: res,
    labels: revenueList.map((r) => r),
    beginAtZero: true,
  };
  return (
    <BarGraph
      stacked={true}
      meta={meta}
      title="Revenue By Date"
      graphId="revenue-date-summary"
    />
  );
}

export default RevenueByDateGraph;
