import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Route, NavLink } from "react-router-dom";

import Table from "../components/tables/Table";
import MatIcon from "../components/icons/MatIcon";
import { COMPLAINTS } from "../helpers/GraphQL";
import NewComplaintRegisterPage from "./complaints/NewComplaintRegisterPage";
import Modal from "../components/modals/Modal";
import AssignComplaintPopup from "./complaints/AssignComplaintPopup";
import UpdateComplaintForm from "./complaints/UpdateComplaintForm";
import useProfile from "../components/hooks/useProfile";
import Pagination from "../components/tables/Pagination";
import { useEffect } from "react";
import ComplaintDetailViewPage from "./complaints/ComplaintDetailViewPage";
import FilterForm from "./complaints/FilterForm";
import { BASE_URL } from "../conf";
const PAGE_SIZE = 10;
function ComplaintsPage() {
  useProfile();
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState(new Map());
  const [getComplaints, { loading, data, error }] = useLazyQuery(COMPLAINTS, {
    variables: { pageSize: PAGE_SIZE, pageNo: pageNo, ...filter },
  });

  useEffect(() => {
    const abortCtrl = new AbortController();
    console.log("Start");
    getComplaints();

    return function cleanup() {
      abortCtrl.abort();
    };
  }, [pageNo, filter]);

  function handleSubmit(formData) {
    console.log(formData);
    let params = new Map();
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        params[key] = value;
      }
    }
    console.log("Params: ", params);
    setFilter(params);
    setPageNo(1);
  }

  function handleExport(formData) {
    let params = new Map();
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        params[key] = value;
      }
    }
    let q = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    fetch(`${BASE_URL}/export-complaints?${q}`)
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "Export.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  function handlePageChange(newPageNo) {
    setPageNo(newPageNo);
  }

  const [assign, setAssign] = useState(false);
  const [selected, setSelected] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const columns = [
    { name: "id", label: "ID" },
    { name: "clientName", label: "Client Name" },
    { name: "location_name", label: "Location" },
    { name: "openDate", label: "Open Date" },
    { name: "nature_name", label: "Nature of Complaint" },
    { name: "status", label: "Status" },
    {
      name: "assigned_to",
      label: "Assigned To",
      render: (row) =>
        row.assignedTo ? (
          <span>{row.assignedTo.username}</span>
        ) : (
          <button
            onClick={() => {
              setAssign(true);
              setSelected(row);
            }}
          >
            Assign
          </button>
        ),
    },
    { name: "details", label: "Details", className: "col-ellipsis" },
    {
      name: "updateDetails",
      label: "",
      render: (row) =>
        row.status === "ASSIGNED" ? (
          <NavLink
            className="btn btn-light p-1 d-flex align-left"
            to={`/complaints/update/${row.id}`}
          >
            <MatIcon name="settings" text="Complete" />
          </NavLink>
        ) : null,
    },
    {
      name: "viewDetails",
      render: (row) => (
        <NavLink to={`/complaints/view/${row.id}`} className="d-flex">
          <MatIcon name="unfold_more" />
        </NavLink>
      ),
    },
  ];
  const fmtDate = (strDate) => {
    let parsed = Date.parse(strDate);
    return new Date(parsed).toLocaleDateString("en-GB");
  };
  const records = data
    ? data.complaints.map((r) => ({
        ...r,
        nature_name: r.nature.name,
        location_name: r.location ? r.location.name : "",
        openDate: fmtDate(r.openDate),
      }))
    : [];
  return (
    <>
      <Route path="/complaints" exact>
        <div className="toolbar">
          <h5>List of complaints</h5>
          <NavLink
            className="d-flex btn has-left-icon"
            to="/complaints/new-complaint"
          >
            <MatIcon name="add" text="New Complaint" />
          </NavLink>
        </div>
        <hr />
        <div className="toolbar">
          {data && (
            <FilterForm
              handleSubmit={handleSubmit}
              filter={filter}
              handleExport={handleExport}
            />
          )}
        </div>
        <Table columns={columns} data={records} />
        {data && (
          <Pagination
            pageNo={pageNo}
            onPageChanged={handlePageChange}
            lastPage={data.complaints.length < PAGE_SIZE}
          />
        )}
      </Route>
      <Route path="/complaints/new-complaint" exact>
        <NewComplaintRegisterPage />
      </Route>
      <Route path="/complaints/update/:id" exact>
        <UpdateComplaintForm />
      </Route>
      <Route path="/complaints/view/:id" exact>
        <ComplaintDetailViewPage />
      </Route>
      {assign && (
        <Modal title={selected.clientName} onClose={() => setAssign(false)}>
          <AssignComplaintPopup
            complaint={selected}
            onComplete={() => setAssign(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default ComplaintsPage;
