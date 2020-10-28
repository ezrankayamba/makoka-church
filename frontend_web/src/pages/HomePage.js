import React from "react";
import DropdownButton from "../components/forms/DropdownButton";
import RevenueByDateGraph from "./dashboard/RevenueByDateGraph";
import RevenueExpensesByDateGraph from "./dashboard/RevenueExpensesByDateGraph";
import TitheByDateGraph from "./dashboard/TitheByDateGraph";

function HomePage() {
  console.log("Home Page")
  const exportActions = [{
    label: "Export Records",
    clickHandler: () => console.log("Export Records")
  }, {
    label: "Export Aggregated",
    clickHandler: () => console.log("Export Aggregated")
  }]
  return (
    <div className="dashboard">
      <RevenueByDateGraph />
      <TitheByDateGraph />
      <RevenueExpensesByDateGraph />
      <div>
        <DropdownButton actions={exportActions} label="Export" />
      </div>
    </div>
  );
}

export default HomePage;
