import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { USERS_GET_ME } from "../../helpers/UsersGraphQL";

function Select({ label, name, query, options = [], ...props }) {
  let { loading, data, error } = useQuery(query ? query.name : USERS_GET_ME, {
    skip: query === null,
  });
  if (loading || error) {
    return null;
  }

  if (data && query) {
    options = data[query.data];
  }

  return (
    <div className="input-wrap">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...props}>
        <option value="">---Select---</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
