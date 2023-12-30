import React, { Fragment } from "react";
import ReactDOM from 'react-dom';

import './Modal.scss';

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div>
          <div className="backdrop" onClick={props.onClose} />
          <div className="modal">{props.children}</div>
        </div>,
        portalElement)}
    </Fragment>

  );
};

export default Modal;