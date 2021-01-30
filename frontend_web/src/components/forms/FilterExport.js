import React from "react";
import DropdownButton from "./DropdownButton";
import Input from "./Input";
import Select from "./Select";

function FilterExport({
  fields,
  handleChange,
  handleSubmit,
  filter,
  exportActions
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
          <DropdownButton actions={exportActions} label="Export" />
        </div>
      </form>
    </div>
  );
}

export default FilterExport;
