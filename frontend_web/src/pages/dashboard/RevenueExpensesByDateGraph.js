import React from "react";
import { REVENUE_EXPENSES_SUMMARY } from "../../helpers/ReportsGraphQL";
import { useQuery } from "@apollo/react-hooks";
import BarGraph from "../../components/graph/BarGraph";
import useProfile from "../../components/hooks/useProfile";
import { ColorsHelper } from "../../helpers/ColorsHelper";

function RevenueExpensesByDateGraph(props) {
  useProfile();
  const { loading, data, error } = useQuery(REVENUE_EXPENSES_SUMMARY);
  if (loading) return 'Loading ...';
  if (error) return 'Error!';
  console.log(data);

  let placeHolder = [
    { cat: "REVENUE", total: 0 },
    { cat: "EXPENSES", total: 0 },
  ];
  console.log(data.revenueExpensesSummary);

  let list = data.revenueExpensesSummary
    .map((d) => {
      return d.date;
    })
    .filter((v, i, a) => a.indexOf(v) === i);
  let res = placeHolder.map((s) => {
    return {
      label: s.cat,
      backgroundColor: ColorsHelper.randomColor(),
      data: list.map((p) => {
        let x = data.revenueExpensesSummary.find(
          (d) => d.date === p && d.cat === s.cat
        );
        return x ? x.total : 0;
      }),
    };
  });

  const meta = {
    data: res,
    labels: list.map((r) => r),
    beginAtZero: true,
  };
  return (
    <BarGraph
      stacked={true}
      meta={meta}
      title="Revenue vs Expenses By Date"
      graphId="revenue-expenses-date-summary"
    />
  );
}

export default RevenueExpensesByDateGraph;
