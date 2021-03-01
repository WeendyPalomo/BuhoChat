import React from "react";
import "../styles/App.css";
import MainLayout from "./MainLayout";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <>
      <MainLayout>
        <LoginPage />
      </MainLayout>
    </>
  );
}
export default App;
