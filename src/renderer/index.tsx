import "./index.css";
import "mobx-react-lite/batchingForReactDom";
import React from "react";
import { render } from "react-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Routines from "./components/Routines";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Running from "./components/Running";
import { Provider } from "./components/MSTContext";
import { rootStore } from "../models";

function App() {
  return (
    <Provider>
      <MemoryRouter
        initialEntries={[rootStore.settings.autoStart ? "/running" : "/"]}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="running" element={<Running />} />
          <Route path="routines" element={<Routines />} />
          <Route path="routines/:id" element={<Details />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

render(<App />, document.getElementById("app"));
