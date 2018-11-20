import React from "react";
import { string } from "prop-types";
import "./Timer.css";

export const Timer = ({ seconds }) => {
  return <p className="timer">{seconds}</p>;
};

Timer.propTypes = {
  seconds: string.isRequired
};
