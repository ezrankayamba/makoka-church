import React from "react";
import { STATUS_SUMMARY } from "../../helpers/ReportsGraphQL";
import { useQuery } from "@apollo/react-hooks";
import PieChart from "../../components/graph/PieChart";
import useProfile from "../../components/hooks/useProfile";

function ComplaintsByStatusGraph() {
  useProfile();
  const { loading, data, error } = useQuery(STATUS_SUMMARY);
  if (loading) return null;
  if (error) return null;
  console.log(data);
  const meta = {
    data: data.statusSummary.map((r) => {
      return {
        name: r.name,
        value: r.count,
      };
    }),
  };
  return (
    <PieChart
      meta={meta}
      title="Complaints Status Summary"
      graphId="complaints-status-summary"
    />
  );
}

export default ComplaintsByStatusGraph;
