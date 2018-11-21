import React from "react";

const Speech = ({ text }) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
  synth.speak(utterance);
  return null;
};

export default React.memo(Speech);
