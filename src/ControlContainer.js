import React from "react";
import "./ControlContainer.css";

const ControlContainer = ({ name, handleClick }) => (
  <div className="control-container" onClick={handleClick}>
    <h2>{name}</h2>
  </div>
);

export default React.memo(ControlContainer);
