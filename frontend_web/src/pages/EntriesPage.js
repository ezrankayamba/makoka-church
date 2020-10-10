import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Route, NavLink } from "react-router-dom";

import Table from "../components/tables/Table";
import MatIcon from "../components/icons/MatIcon";
import { GET_ENTRIES } from "../helpers/GraphQL";
import NewEntryPage from "./entries/NewEntryPage";
import useProfile from "../components/hooks/useProfile";
import Pagination from "../components/tables/Pagination";
import { useEffect } from "react";
import FilterForm from "./entries/FilterForm";
import { BASE_URL } from "../conf";
import Numbers from "../helpers/Numbers";
import EntrySummary from "./entries/EntrySummary";
const PAGE_SIZE = 10;
function EntriesPage() {
  useProfile();
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState(new Map());
  const [getEntries, { loading, data, error }] = useLazyQuery(GET_ENTRIES, {
    variables: { pageSize: PAGE_SIZE, pageNo: pageNo, ...filter },
  });


  useEffect(() => {
    const abortCtrl = new AbortController();
    console.log("Start");
    getEntries();

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
    fetch(`${BASE_URL}/export-entries?${q}`)
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

  const columns = [
    { name: "id", label: "ID" },
    { name: "entity_name", label: "Entity" },
    { name: "amount", label: "Amount" },
    { name: "entryType", label: "Entry Type" },
    { name: "createdAt", label: "Created" },
    // { name: "updatedAt", label: "Updated" },
  ];
  const fmtDate = (strDate) => {
    let parsed = Date.parse(strDate);
    return new Date(parsed).toLocaleDateString("en-GB");
  };
  const records = data
    ? data.entries.map((r) => ({
      ...r,
      entity_name: r.entity.name,
      createdAt: fmtDate(r.createdAt),
      updatedAt: fmtDate(r.updatedAt),
      amount: Numbers.fmt(r.amount),
      entryType: r.entryType === 0 ? "Revenue" : "Expense"
    }))
    : [];


  return (
    <>
      <Route path="/entries" exact>
        <div className="toolbar">
          <h5>List of entries</h5>
          <NavLink className="d-flex btn has-left-icon" to="/entries/new-entry">
            <MatIcon name="add" text="New Entry" />
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
        <div className="d-flex">
          <div className="d-flex-main">
            <Table columns={columns} data={records} />
            {data && (
              <Pagination
                pageNo={pageNo}
                onPageChanged={handlePageChange}
                lastPage={data.entries.length < PAGE_SIZE}
              />
            )}
          </div>
          <EntrySummary filter={filter} />
        </div>
      </Route>
      <Route path="/entries/new-entry" exact>
        <NewEntryPage filter={filter} />
      </Route>
    </>
  );
}

export default EntriesPage;
