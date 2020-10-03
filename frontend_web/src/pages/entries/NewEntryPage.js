import React, { useState } from "react";
import Input from "../../components/forms/Input";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  CREATE_ENTITY,
  CREATE_ENTRY,
  GET_ENTITIES,
  GET_ENTRIES,
} from "../../helpers/GraphQL";
import MatIcon from "../../components/icons/MatIcon";
import { NavLink, Redirect } from "react-router-dom";
import { ENTRIES_FILTER_VARS } from "../../constants";
import CreatableSelect from "../../components/forms/CreatableSelect";

function NewEntryPage({}) {
  let entities = useQuery(GET_ENTITIES);
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState(new Map());
  const [createEntry, { loading }] = useMutation(CREATE_ENTRY);
  const [createEntity, {}] = useMutation(CREATE_ENTITY);
  const entityOptions = entities.data ? entities.data.entities : [];

  function handleSubmit(e) {
    e.preventDefault();
    createEntry({
      variables: {
        ...formData,
      },
      refetchQueries: () => [
        { query: GET_ENTRIES, variables: ENTRIES_FILTER_VARS },
      ],
      awaitRefetchQueries: true,
    }).then(
      () => {
        // setRedirect("/entries/new-entry?abc");
        window.location.reload();
      },
      (res) => console.log("Error: ", res)
    );
  }
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function onCreateOption(name, value) {
    createEntity({
      variables: {
        name: value,
      },
      refetchQueries: () => [{ query: GET_ENTITIES }],
      awaitRefetchQueries: true,
    }).then(
      (res) => {
        let id = res.data.createEntity.result.id;
        console.log("Res", res.data.createEntity.result.id);
        setFormData({ ...formData, [name]: id });
      },
      (res) => console.log("Error: ", res)
    );
  }
  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div>
      <div className="toolbar">
        <div className="titlebar">
          <NavLink to="/entries" className="btn btn-light mr-1">
            <MatIcon name="keyboard_arrow_left" />
          </NavLink>
          <h5>Register New Entry</h5>
        </div>
      </div>
      {loading && <p>Sending ....</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <CreatableSelect
            name="entity"
            label="Entity"
            options={entityOptions}
            onChange={handleChange}
            onCreateOption={onCreateOption}
            defaultValue={formData["entity"]}
            required
          />
          <Input
            name="amount"
            label="Amount"
            type="number"
            onChange={handleChange}
            required
            min={100}
          />
        </div>
        <div className="form-footer">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewEntryPage;
