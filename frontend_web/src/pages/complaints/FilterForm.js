import React, { useState } from "react";
import { NATURES, LOCATIONS, GET_STATUSES } from "../../helpers/GraphQL";
import FilterExport from "../../components/forms/FilterExport";

function FilterForm({ handleSubmit, handleExport, filter = {} }) {
  console.log(filter);
  const [formData, setFormData] = useState(filter);
  const searchFields = [
    { name: "clientName", label: "Client Name" },
    {
      name: "location",
      label: "Location",
      type: "select",
      query: { name: LOCATIONS, data: "locations" },
      defaultValue: filter["location"],
    },
    {
      name: "nature",
      label: "Nature",
      type: "select",
      query: { name: NATURES, data: "natures" },
      defaultValue: filter["nature"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      query: { name: GET_STATUSES, data: "statuses" },
      defaultValue: filter["status"],
    },
  ];
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value || null });
  }

  return (
    <FilterExport
      handleSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}
      fields={searchFields}
      handleChange={handleChange}
      handleExport={(e) => {
        e.preventDefault();
        handleExport(formData);
      }}
    />
  );
}

export default FilterForm;
