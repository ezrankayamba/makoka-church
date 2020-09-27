import React, { useState } from "react";
import { withRouter } from "react-router";
import { GET_COMPLAINT } from "../../helpers/GraphQL";
import useProfile from "../../components/hooks/useProfile";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";
import MatIcon from "../../components/icons/MatIcon";
import { useRef } from "react";
import Modal from "../../components/modals/Modal";
import FeedbackForm from "./FeedbackForm";
import ComplaintAttachements from "./ComplaintAttachements";
let dayjs = require("dayjs");
let html2canvas = require("html2canvas");

function ComplaintDetailViewPage({ match }) {
  useProfile();
  const detailsView = useRef(null);
  const [feedback, setFeedback] = useState(null);
  const [img, setImg] = useState(null);
  const { loading, error, data } = useQuery(GET_COMPLAINT, {
    variables: { id: match.params.id },
  });

  error && console.error(error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let complaint = data.complaint;
  function calc_kpi_days(open, close) {
    console.log(`Open: ${open}`, `Close: ${close}`);
    if (!close) {
      close = dayjs().format("YYYY-MM-DD");
    }
    if (open.indexOf("T")) open = open.split("T")[0];
    if (close.indexOf("T")) close = close.split("T")[0];
    console.log(`Open: ${open}`, `Close: ${close}`);
    return dayjs(close).diff(dayjs(open), "day");
  }
  function detailsImage(e) {
    let btn = e.target;
    console.log(btn);
    html2canvas(detailsView.current, { scrollY: -window.scrollY }).then(
      (canvas) => {
        // document.body.appendChild(canvas);
        console.log(canvas);
        let dt = canvas.toDataURL("image/png");
        // downloadURI(dt, "test.png");
        setImg(dt);
        setFeedback(true);
      }
    );
  }
  const {
    id,
    clientName,
    location,
    nature,
    openDate,
    details,
    actionPlan,
    closeDate,
    costCenter,
    financialImpact,
    rca,
    responsiblePerson,
    results,
    status,
    assignedTo,
    assignedAt,
    closedBy,
  } = complaint;
  const fmtDate = (strDate) => {
    if (strDate) {
      if (strDate.indexOf("T")) strDate = strDate.split("T")[0];
      return dayjs(strDate).format("DD/MM/YYYY");
    }
    return null;
  };
  return (
    <div className="details">
      <div className="toolbar">
        <div className="titlebar">
          <NavLink to="/complaints" className="btn btn-light mr-1">
            <MatIcon name="keyboard_arrow_left" />
          </NavLink>
          <h5>Complete Complaint Information</h5>
        </div>
      </div>
      <div className="details-grid" ref={detailsView}>
        <div className="grid-form-details">
          <div>
            <label>Client Name</label>
            <p>{clientName}</p>
          </div>
          <div>
            <label>Location</label>
            <p>{location.name}</p>
          </div>
          <div>
            <label>Nature</label>
            <p>{nature.name}</p>
          </div>
          <div>
            <label>Open Date</label>
            <p>{fmtDate(openDate)}</p>
          </div>
          <div className="span">
            <label>Details</label>
            <p>{details}</p>
          </div>
          <div className="span">
            <label>Details</label>
            <p>{details}</p>
          </div>
          <div>
            <label>Action Plan</label>
            <p>{actionPlan}</p>
          </div>
          <div>
            <label>Root Cause Analysis</label>
            <p>{rca}</p>
          </div>
          <div className="span">
            <label>Results</label>
            <p>{results}</p>
          </div>
          <div className="span">
            <label>Financial Impact</label>
            <p>{financialImpact}</p>
          </div>
          <div>
            <label>Cost Center</label>
            <p>{costCenter}</p>
          </div>
          <div>
            <label>Responsible Person</label>
            <p>{responsiblePerson}</p>
          </div>
        </div>
        <div className="sidebar mt-1 bg-light">
          <div className="status">
            <label>
              Status: <span>{status}</span>
            </label>
          </div>
          <ul>
            {openDate && (
              <li>
                <MatIcon name="done" />
                On {fmtDate(openDate)}, Created
              </li>
            )}
            {assignedTo && (
              <li>
                <MatIcon name="done" />
                On {fmtDate(assignedAt)}, Assigned to {assignedTo.username}
              </li>
            )}
            {closedBy && (
              <li>
                <MatIcon name="done" />
                On {fmtDate(closeDate)}, Closed by {closedBy.username}
              </li>
            )}
            <li className="kpi">
              KPI:
              <span className="ml-1">
                <b>{calc_kpi_days(openDate, closeDate)}</b> day(s)
              </span>
            </li>
          </ul>
          <ComplaintAttachements complaint_id={id} />
          {status === "COMPLETED" && (
            <button className="send-feedback btn ripple" onClick={detailsImage}>
              <MatIcon name="mail_outline" text="Send Feedback To Customer" />
            </button>
          )}
        </div>
      </div>
      {feedback && (
        <Modal
          title={`Feedback To: ${complaint.clientName}`}
          onClose={() => setFeedback(false)}
        >
          <FeedbackForm
            complaint={complaint}
            img={img}
            onComplete={() => setFeedback(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default withRouter(ComplaintDetailViewPage);
