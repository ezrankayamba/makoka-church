import React from "react";
import RevenueByDateGraph from "./dashboard/RevenueByDateGraph";
import TitheByDateGraph from "./dashboard/TitheByDateGraph";

function HomePage() {
  console.log("Home Page")
  return (
    <div className="dashboard">
      <RevenueByDateGraph />
      <TitheByDateGraph />
    </div>
  );
}

export default HomePage;
