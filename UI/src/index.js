import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Fragment>
      <Dashboard />
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
