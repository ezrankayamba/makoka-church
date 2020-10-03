import React, { useState, useEffect } from "react";
import {
  COMPLAINTS,
  UPDATE_DETAILS_COMPLAINT,
  GET_COMPLAINT,
} from "../../helpers/GraphQL";
import Input from "../../components/forms/Input";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Redirect, NavLink } from "react-router-dom";
import MatIcon from "../../components/icons/MatIcon";
import { withRouter } from "react-router";
import useProfile from "../../components/hooks/useProfile";
import { attachmentsChangeHandler } from "../../helpers/FileUpload";

function UpdateComplaintForm({ match }) {
  useProfile();
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState(new Map());
  const [attachments, setAttachments] = useState([]);

  const { loading, error, data } = useQuery(GET_COMPLAINT, {
    variables: { id: match.params.id },
  });
  const [updateDetails] = useMutation(UPDATE_DETAILS_COMPLAINT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let complaint = data.complaint;

  function handleSubmit(e) {
    e.preventDefault();
    let prev = new Map();
    Object.keys(complaint).forEach((key) => {
      if (!formData[key]) {
        prev[key] = complaint[key];
      }
    });

    updateDetails({
      variables: {
        ...formData,
        ...prev,
        attachments: attachments,
        id: complaint.id,
      },
      refetchQueries: [{ query: COMPLAINTS }],
    }).then(
      () => setRedirect("/complaints"),
      (res) => console.log("Error: ", res)
    );
  }
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const inputsConf = {
    type: "textarea",
    onChange: handleChange,
    required: "required",
    maxLength: "200",
    help: "Max 200 characters",
  };
  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div className="form-wrap">
      <div className="toolbar">
        <div className="titlebar">
          <NavLink to="/complaints" className="btn btn-light mr-1">
            <MatIcon name="keyboard_arrow_left" />
          </NavLink>
          <h5>Fill complain analysis/resolution</h5>
        </div>
      </div>

      <form className="form form-flex v-scroll" onSubmit={handleSubmit}>
        <div className="form-fields">
          <p>
            <b>Details:</b> {complaint.details}
          </p>
          <Input
            name="actionPlan"
            label="Action Plan"
            {...inputsConf}
            defaultValue={complaint.actionPlan}
          />
          <Input
            name="rca"
            label="Root Cause Analysis"
            {...inputsConf}
            defaultValue={complaint.rca}
          />
          <Input
            name="results"
            label="Results"
            {...inputsConf}
            defaultValue={complaint.results}
            maxLength="500"
            help="Max 500 characters"
            rows="4"
          />
          <Input
            name="financialImpact"
            label="Financial Impact"
            {...inputsConf}
            defaultValue={complaint.financialImpact}
          />
          <Input
            name="costCenter"
            label="Cost Center"
            {...inputsConf}
            defaultValue={complaint.costCenter}
          />
          <Input
            name="responsiblePerson"
            label="Responsible Person"
            {...inputsConf}
            defaultValue={complaint.responsiblePerson}
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
        <div className="form-footer">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(UpdateComplaintForm);
