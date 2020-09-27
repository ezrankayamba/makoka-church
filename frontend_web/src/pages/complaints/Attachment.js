import React from "react";
import MatIcon from "../../components/icons/MatIcon";
import { ROOT_URL } from "../../conf";

function Attachment({ doc }) {
  console.log(doc);
  let split = doc.file.split("/");
  let name = split[split.length - 1];
  return (
    <>
      <span className="text-ellipsis">{name}</span>
      <a
        href={`${ROOT_URL}/media/${doc.file}`}
        className="borded-link"
        download
      >
        <MatIcon name="arrow_downward" />
      </a>
    </>
  );
}

export default Attachment;
