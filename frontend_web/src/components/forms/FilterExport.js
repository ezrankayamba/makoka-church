import React from "react";
import Input from "./Input";
import Select from "./Select";

function FilterExport({
  fields,
  handleChange,
  handleSubmit,
  filter,
  handleExport,
}) {
  return (
    <div className="filter-export  w-100">
      <form className="form d-flex align-bottom" onSubmit={handleSubmit}>
        <div className="inline-fields">
          {fields.map((f) => {
            return f.type && f.type === "select" ? (
              <Select key={f.name} {...f} onChange={handleChange} />
            ) : (
              <Input key={f.name} {...f} onChange={handleChange} />
            );
          })}
        </div>
        <div className="d-flex">
          <button name="filter">Filter</button>
          <button
            className="ml-1"
            name="export"
            type="button"
            onClick={handleExport}
          >
            Export
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterExport;
