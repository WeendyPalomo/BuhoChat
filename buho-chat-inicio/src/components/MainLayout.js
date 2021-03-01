import React from "react";
import { Layout } from "antd";
import "../styles/MainLayout.css";

const { Header, Footer, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <>
      <Layout className="main-layout">
        <Header className="header">BúhoChat</Header>
        <Content className="content">{children}</Content>
        <Footer className="footer" align="center">
          Derechos Reservados EPN
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
