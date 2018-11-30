import React from "react";
import "./ButtonContainer.css";

const ButtonContainer = props => (
  <div className="button-container">{props.children}</div>
);

export default React.memo(ButtonContainer);
