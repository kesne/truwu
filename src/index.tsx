import "./index.css";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import Routines from "./Routines";
import Layout from "./Layout";
import Home from "./Home";
import Settings from "./Settings";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="routines" element={<Routines />} />
          <Route path="routines/:id" element={<Details />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

render(<App />, document.getElementById("root"));
