import "./index.css";
import "mobx-react-lite/batchingForReactDom";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Routines from "./components/Routines";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Settings from "./components/Settings";
import { Provider, rootStore } from "./models";

function App() {
  return (
    <Provider value={rootStore}>
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
    </Provider>
  );
}

render(<App />, document.getElementById("root"));
