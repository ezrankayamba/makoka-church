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
import { ENTRIES_FILTER_VARS, ENTRIES_FILTER_VARS_NO_PAGES } from "../../constants";
import CreatableSelect from "../../components/forms/CreatableSelect";

function NewEntryPage({ filter }) {
  const entryTypes = [{ id: 0, name: "Revenue" }, { id: 1, name: "Expense" }]
  let entities = useQuery(GET_ENTITIES);
  const [redirect] = useState(null);
  const [message, setMessage] = useState(null);
  const defaultData = new Map()
  defaultData['entryType'] = 0
  const [formData, setFormData] = useState(defaultData);
  const [createEntry, { loading }] = useMutation(CREATE_ENTRY);
  const [createEntity, { }] = useMutation(CREATE_ENTITY);
  const entityOptions = entities.data ? entities.data.entities : [];


  function handleSubmit(e) {
    e.preventDefault();
    console.log("The new form data: ", formData)
    if (formData['entity'] && formData['amount'] && formData['entryType']) {
      createEntry({
        variables: {
          ...formData,
        },
        refetchQueries: () => [
          { query: GET_ENTRIES, variables: { ...ENTRIES_FILTER_VARS, filter } },
          { query: GET_ENTRIES, variables: { ...ENTRIES_FILTER_VARS_NO_PAGES, ...filter } },
        ],
        awaitRefetchQueries: true,
      }).then(
        () => {
          // setRedirect("/entries/new-entry?abc");
          // window.location.reload();
          setFormData({ ...formData, amount: "", entity: null })
        },
        (res) => console.log("Error: ", res)
      );
    } else {
      setMessage("Fill in amount & entity")
    }

  }
  function handleChange(e) {
    const { value, name } = e.target;
    console.log(name, value)
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
        setFormData({ ...formData, [name]: id });
        setMessage("Successfully recorded!")
      },
      (res) => setMessage(message)
    );
  }
  console.log(entryTypes)
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
        {message && <small className="p-1">Message: {message}</small>}
        <form className="form" onSubmit={handleSubmit} autoComplete={"off"}>
          <div>
            <CreatableSelect
              name="entryType"
              label="Type"
              options={entryTypes}
              onChange={handleChange}
              defaultValue={formData["entryType"] || 0}
              required
            />
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
              defaultValue={formData['amount'] || undefined}
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
