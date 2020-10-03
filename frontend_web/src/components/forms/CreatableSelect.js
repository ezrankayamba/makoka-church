import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { USERS_GET_ME } from "../../helpers/UsersGraphQL";
import Creatable from "react-select/creatable";

function CreatableSelect({
  label,
  name,
  query,
  onCreateOption,
  onChange,
  options = [],
  defaultValue = null,
  ...props
}) {
  let { loading, data, error } = useQuery(query ? query.name : USERS_GET_ME, {
    skip: query === null,
  });
  if (loading || error) {
    return null;
  }

  if (data && query) {
    options = data[query.data];
  }

  function handleChange(option) {
    if (onChange) {
      onChange({ target: { name: name, value: option.value } });
    }
  }

  function handleCreate(value) {
    if (onCreateOption) onCreateOption(name, value);
  }

  const selOptions = options.map((e) => {
    return { value: e.id, label: e.name };
  });
  let selObj = selOptions.find((o) => {
    console.log(defaultValue, o.value);
    return defaultValue == o.value;
  });
  console.log(selObj);
  const value =
    defaultValue && selObj
      ? {
          value: defaultValue,
          label: selObj.label,
        }
      : null;

  console.log(value);
  return (
    <div className="input-wrap">
      <label htmlFor={name}>{label}</label>
      <Creatable
        options={selOptions}
        {...props}
        onCreateOption={handleCreate}
        onChange={handleChange}
        value={value}
        maxMenuHeight={110}
      />
    </div>
  );
}

export default CreatableSelect;
