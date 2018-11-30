import React from "react";
import "./MainContainer.css";

const MainContainer = props => <div id="main-container">{props.children}</div>;

export default React.memo(MainContainer);
