import React from "react";

export const ControlButton = ({ name, onClick }) => (
  <button id={`${name}-btn`} onClick={onClick}>
    {name.charAt(0).toUpperCase() + name.slice(1)}
  </button>
);
