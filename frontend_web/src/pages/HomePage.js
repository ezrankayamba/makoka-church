import React from "react";
import RevenueByDateGraph from "./dashboard/RevenueByDateGraph";
import RevenueExpensesByDateGraph from "./dashboard/RevenueExpensesByDateGraph";
import TitheByDateGraph from "./dashboard/TitheByDateGraph";

function HomePage() {
  console.log("Home Page")
  return (
    <div className="dashboard">
      <RevenueByDateGraph />
      <TitheByDateGraph />
      <RevenueExpensesByDateGraph />
    </div>
  );
}

export default HomePage;
