import React from "react";
import { Col, Row, Typography } from "antd";
import "../styles/HomePage.css";
import group from "../images/remote-team.svg";

const { Title } = Typography;

const HomePage = () => {
  return (
    <Row className="home-page">
      <Col span={12} align="center">
        <Title>CHAT ALEATORIO</Title>
        <Title level={2}>
          Conéctate con personas de la comunidad estudiantil mediante
          conversaciones al azar y publicaciones de tu interés
        </Title>
      </Col>
      <Col span={12}>
        <img src={group} alt="" />
      </Col>
    </Row>
  );
};

export default HomePage;

