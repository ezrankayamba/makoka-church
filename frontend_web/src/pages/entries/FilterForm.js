import React, { useState } from "react";
import { GET_ENTITIES } from "../../helpers/GraphQL";
import FilterExport from "../../components/forms/FilterExport";
import { Dates } from "../../helpers/Dates";

function FilterForm({ handleSubmit, handleExport, filter = {} }) {
  console.log(filter);
  const [formData, setFormData] = useState(filter);
  const searchFields = [
    {
      name: "entity",
      label: "Entity",
      type: "select",
      query: { name: GET_ENTITIES, data: "entities" },
      defaultValue: filter["entity"],
    },
    {
      name: "dateFrom",
      label: "From",
      type: "date",
      defaultValue: filter["dateFrom"] || Dates.fmt(Date.now()),
    },
    {
      name: "dateTo",
      label: "To",
      type: "date",
      defaultValue: filter["dateTo"] || Dates.fmt(Date.now()),
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
