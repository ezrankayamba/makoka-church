import React from "react";
import MatIcon from "../icons/MatIcon";

function Modal({ onClose, title, children, posx, posy, ...props }) {
  const showHideClassName = "modal display-block";
  return (
    <div className={showHideClassName} {...props}>
      <div className="modal-main">
        <div className="modal-header">
          {title ? <h5 className="modal-title">{title}</h5> : <span></span>}
          <div className="btn-group">
            <button
              type="button"
              className="btn text-warning m-1"
              onClick={onClose}
            >
              <MatIcon name="close" />
            </button>
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
