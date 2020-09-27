import React from "react";
import ComplaintsByNatureGraph from "./dashboard/ComplaintsByNatureGraph";
import ComplaintsByStatusGraph from "./dashboard/ComplaintsByStatusGraph";
import ComplaintsByLocationGraph from "./dashboard/ComplaintsByLocationGraph";
import ComplaintsKPIGraph from "./dashboard/ComplaintsKPIGraph";

function HomePage() {
  return (
    <div className="dashboard">
      <ComplaintsByStatusGraph />
      <ComplaintsByLocationGraph />
      <ComplaintsByNatureGraph />
      <ComplaintsKPIGraph />
    </div>
  );
}

export default HomePage;
