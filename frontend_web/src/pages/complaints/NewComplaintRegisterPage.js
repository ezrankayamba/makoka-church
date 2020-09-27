import React, { useState } from "react";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  REGISTER_COMPLAINT,
  COMPLAINTS,
  NATURES,
  LOCATIONS,
} from "../../helpers/GraphQL";
import MatIcon from "../../components/icons/MatIcon";
import { NavLink, Redirect } from "react-router-dom";
import { attachmentsChangeHandler } from "../../helpers/FileUpload";
import { COMPLAINTS_FILTER_VARS } from "../../constants";

function NewComplaintRegisterPage({}) {
  let natures = useQuery(NATURES);
  let locations = useQuery(LOCATIONS);
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState(new Map());
  const [registerComplaint, { loading }] = useMutation(REGISTER_COMPLAINT);
  const natureOptions = natures.data ? natures.data.natures : [];
  const locationOptions = locations.data ? locations.data.locations : [];
  const [attachments, setAttachments] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    registerComplaint({
      variables: {
        ...formData,
        attachments: attachments,
        openDate: `${formData.openDate}T00:00+00:00`,
      },
      refetchQueries: () => [
        { query: COMPLAINTS, variables: COMPLAINTS_FILTER_VARS },
      ],
      awaitRefetchQueries: true,
    }).then(
      () => setRedirect("/complaints"),
      (res) => console.log("Error: ", res)
    );
  }
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div>
      <div className="toolbar">
        <div className="titlebar">
          <NavLink to="/complaints" className="btn btn-light mr-1">
            <MatIcon name="keyboard_arrow_left" />
          </NavLink>
          <h5>Register New Complaint</h5>
        </div>
      </div>
      {loading && <p>Sending ....</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div>
            <Input
              name="clientName"
              label="Client Name"
              onChange={handleChange}
              required
            />
            <Select
              name="location"
              label="Location"
              options={locationOptions}
              onChange={handleChange}
              required
            />
            <Select
              name="nature"
              label="Nature"
              options={natureOptions}
              onChange={handleChange}
              required
            />

            <Input
              name="openDate"
              label="Open Date"
              type="date"
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="register-right">
            <Input
              name="details"
              label="Details"
              type="textarea"
              onChange={handleChange}
              required
              maxLength="300"
              help="Max 300 characters"
              cls="large"
            />
            <Input
              name="attachments"
              type="file"
              label="Attachments"
              multiple
              onChange={(e) =>
                attachmentsChangeHandler(e, (files) => setAttachments(files))
              }
            />
          </div>
        </div>
        <div className="form-footer">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewComplaintRegisterPage;
