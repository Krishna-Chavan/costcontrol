import React from "react";
import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/header/Header";
import UI from "./Components/ui/UI";
import { MsalProvider } from "@azure/msal-react";

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <div style={{ backgroundColor: "whitesmoke" }}>
        <Header />
        <UI msalConfig={msalInstance} />
      </div>
    </MsalProvider>
  );
}

export default App;
