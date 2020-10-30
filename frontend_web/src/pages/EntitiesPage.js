import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import useProfile from "../components/hooks/useProfile";
import MatIcon from "../components/icons/MatIcon";
import Pagination from "../components/tables/Pagination";
import Table from "../components/tables/Table";
import { GET_ENTITIES } from "../helpers/GraphQL";
const PAGE_SIZE = 10;
function EntitiesPage() {
  useProfile();
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState(new Map());
  const [getEntities, { data, refetch }] = useLazyQuery(GET_ENTITIES, {
    variables: { pageSize: PAGE_SIZE, pageNo: pageNo, ...filter },
  });
  useEffect(() => {
    const abortCtrl = new AbortController();
    getEntities()

    return function cleanup() {
      abortCtrl.abort();
    };
  }, [pageNo, filter]);


  const columns = [
    { name: "id", label: "ID" },
    { name: "name", label: "Name" },
    { name: "isMember", label: "Is Member" },
    { name: "createdAt", label: "Created" },
    { name: "action", render: (row) => <button className="btn ripple">View</button> },
  ];
  const fmtDate = (strDate) => {
    let parsed = Date.parse(strDate);
    return new Date(parsed).toLocaleDateString("en-GB");
  };
  const records = data
    ? data.entities.map((r) => ({
      ...r,
      createdAt: fmtDate(r.createdAt),
      isMember: r.isMember ? "Yes" : "No"
    }))
    : [];
  function handlePageChange(newPageNo) {
    setPageNo(newPageNo);
  }
  return <>
    <div className="toolbar">
      <h5>List of members</h5>
      <button className="btn">
        <MatIcon name="add" text="New Member" />
      </button>
    </div>
    <hr />
    <div className="toolbar">

    </div>
    <div className="d-flex desktop">
      <div className="d-flex-main">
        <Table columns={columns} data={records} />
        {data && (
          <Pagination
            pageNo={pageNo}
            onPageChanged={handlePageChange}
            lastPage={data.entities.length < PAGE_SIZE}
          />
        )}
      </div>
    </div>
  </>
}

export default EntitiesPage;
