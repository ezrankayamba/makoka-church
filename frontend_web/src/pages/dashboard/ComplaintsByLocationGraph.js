import React from "react";
import { LOCATION_SUMMARY } from "../../helpers/ReportsGraphQL";
import { useQuery } from "@apollo/react-hooks";
import PieChart from "../../components/graph/PieChart";
import useProfile from "../../components/hooks/useProfile";

function ComplaintsByLocationGraph() {
  useProfile();
  const { loading, data, error } = useQuery(LOCATION_SUMMARY);
  if (loading) return null;
  if (error) return null;
  const meta = {
    data: data.locationSummary.map((r) => {
      return {
        name: r.locName,
        value: r.locCount,
      };
    }),
  };
  return (
    <PieChart
      meta={meta}
      title="Complaints Location Summary"
      graphId="complaints-location-summary"
    />
  );
}

export default ComplaintsByLocationGraph;
