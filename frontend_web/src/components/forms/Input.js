import React from "react";

function Input({ label, name, help, type = "text", cls, ...props }) {
  return (
    <div className={`input-wrap ${cls || ""}`}>
      <label htmlFor={name}>{label}</label>
      {type === "textarea" ? (
        <textarea name={name} id={name} {...props} />
      ) : (
        <input type={type} name={name} id={name} {...props} />
      )}
      {help && <span className="input-help">{help}</span>}
    </div>
  );
}

export default Input;
