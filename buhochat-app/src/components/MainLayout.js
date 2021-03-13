import React from "react";
import { Layout, Row, Col } from "antd";
import "../styles/MainLayout.css";
import MainMenu from "./MainMenu";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header className="header">
        <Row>
          <Col span={8}>BúhoChat</Col>
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
