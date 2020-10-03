import React, { useState } from "react";
import Select from "../../components/forms/Select";
import { UPDATE_ASSIGN_COMPLAINT, COMPLAINTS } from "../../helpers/GraphQL";
import { USERS } from "../../helpers/UsersGraphQL";
import { useMutation, useQuery } from "@apollo/react-hooks";

function AssignComplaintPopup({ complaint, onComplete }) {
  let users = useQuery(USERS);
  const [formData, setFormData] = useState(new Map());
  const [assignTo, { loading }] = useMutation(UPDATE_ASSIGN_COMPLAINT);
  const userOptions = users.data
    ? users.data.users.map((r) => {
        return { ...r, name: r.username };
      })
    : [];
  console.log(complaint);
  function handleSubmit(e) {
    e.preventDefault();
    assignTo({
      variables: {
        ...formData,
        id: complaint.id,
      },
      refetchQueries: [{ query: COMPLAINTS }],
    }).then(
      () => onComplete(),
      (res) => console.log("Error: ", res)
    );
  }
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div>
      <h5>Assign Complaint To User</h5>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <Select
            name="userId"
            label="Assign To"
            onChange={handleChange}
            required
            options={userOptions}
          />
        </div>
        <div className="form-footer">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AssignComplaintPopup;
