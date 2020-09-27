import React from "react";
import { COMPLAINT_ATTACHMENTS } from "../../helpers/GraphQL";
import { useQuery } from "@apollo/react-hooks";
import Attachment from "./Attachment";

function ComplaintAttachements({ complaint_id }) {
  const { loading, error, data } = useQuery(COMPLAINT_ATTACHMENTS, {
    variables: { complaint_id: complaint_id },
  });
  if (loading || error) {
    return null;
  }
  const attachments = data.complaintAttachments;
  return (
    <ul className="attachments mb-1">
      <li>
        <b>Attachments</b>
      </li>
      {attachments.length ? (
        attachments.map((doc) => (
          <li key={doc.id}>
            <Attachment doc={doc} />
          </li>
        ))
      ) : (
        <li>None</li>
      )}
    </ul>
  );
}

export default ComplaintAttachements;
