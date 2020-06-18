import "./index.css";
import React from "react";
import { render } from "react-dom";
import Detail from "./Detail";
import Layout from "./Layout";

render(
  <Layout>
    <Detail />
  </Layout>,
  document.getElementById("root")
);
