import React from "react";

function Table({ columns, data, idCol = "id" }) {
  return (
    <div className="table-container">
      <table className="table-scrollable">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[idCol]}>
              {columns.map((col) => (
                <td key={col.name} className={col.className}>
                  {col.render ? col.render(row) : row[col.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
