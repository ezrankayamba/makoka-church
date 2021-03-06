import React, { useState } from "react";
import Input from "../../components/forms/Input";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  CREATE_ENTITY,
  CREATE_ENTRY,
  GET_ENTITIES,
} from "../../helpers/GraphQL";
import { Redirect } from "react-router-dom";
import CreatableSelect from "../../components/forms/CreatableSelect";
import useProfile from "../../components/hooks/useProfile";
import { Dates } from "../../helpers/Dates";

function NewEntryPage({ onSuccess }) {
  useProfile()
  const entryTypes = [{ id: 0, name: "Revenue" }, { id: 1, name: "Expense" }]
  let entities = useQuery(GET_ENTITIES);
  const [redirect] = useState(null);
  const [message, setMessage] = useState(null);
  const defaultData = new Map()
  defaultData['entryType'] = 0
  defaultData['createdAt'] = Dates.fmt(Date.now(), true)
  const [formData, setFormData] = useState(defaultData);
  const [createEntry, { loading }] = useMutation(CREATE_ENTRY);
  const [createEntity, { }] = useMutation(CREATE_ENTITY);
  const entityOptions = entities.data ? entities.data.entities : [];


  function handleSubmit(e) {
    e.preventDefault();
    if (formData['entity'] && formData['amount']) {
      createEntry({
        variables: {
          ...formData, createdAt: formData['createdAt'].split(" ")[0]
        },
        // refetchQueries: () => [
        //   { query: GET_ENTRIES, variables: { ...ENTRIES_FILTER_VARS, filter } },
        //   { query: GET_ENTRIES, variables: { ...ENTRIES_FILTER_VARS_NO_PAGES, ...filter } },
        // ],
        awaitRefetchQueries: true,
      }).then(
        (res) => {
          // setRedirect("/entries/new-entry?abc");
          // window.location.reload();
          console.log(res)
          setFormData({ ...formData, amount: "", entity: null })
          let entryId = res.data.createEntry.result.id
          setMessage({ error: false, text: `Successfully recorded an entry: ${entryId}` })
          onSuccess(entryId)
        },
        (res) => {
          console.log("Error: ", res)
          setMessage({ error: true, text: "Form submit failed!" });
        }
      );
    } else {
      setMessage({ error: true, text: "Fill in amount & entity" })
    }
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
        setFormData({ ...formData, [name]: id });
      },
      () => setMessage({ error: true, text: "Error creating entity" })
    );
  }
  return redirect ? (
    <Redirect to={redirect} />
  ) : (
      <div>
        {loading && <p>Sending ....</p>}

        <form className="form" onSubmit={handleSubmit} autoComplete={"off"}>
          <div>
            <Input
              name="createdAt"
              label="Record Date"
              type="datetime-local"
              onChange={handleChange}
              required
              defaultValue={Dates.fmt(Date.now(), true)}
            />
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
              value={formData['amount']}
              min={100}
            />
          </div>
          <div className="form-footer">
            <button>Submit</button>
          </div>
        </form>
        {message && <small className={`p-1 message ${message.error ? "fail" : "success"}`}>{message.text}</small>}
      </div>
    );
}

export default NewEntryPage;
