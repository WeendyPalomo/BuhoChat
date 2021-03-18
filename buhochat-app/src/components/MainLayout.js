import React from "react";
import { Col, Layout, Row } from "antd";
import "../styles/MainLayout.css";
import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header className="header">
        <Row>
          <Col span={8} className="title-header">
            BúhoChat
          </Col>
          <MainMenu />
        </Row>
      </Header>
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer
        style={{ textAlign: "center", background: "#F03A47", padding: 5 }}
      >
        Derechos Reservados EPN©
      </Footer>
    </Layout>
  );
};

export default MainLayout;
