import React from "react";
import { Col, Row, Typography } from "antd";
import "../styles/HomePage.css";
import group from "../images/remote-team.svg";
import withoutAuth from "../hocs/withoutAuth";
<style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
</style>

const { Title } = Typography;

const HomePage = () => {
  return (
    <Row className="home-page">
      <Col span={12} align="center">
        <h1 className="title-home">
          CHAT ALEATORIO
        </h1>
        <p className="title-description" level={2}>
          Conéctate con personas de la comunidad estudiantil mediante
          conversaciones al azar y publicaciones de tu interés
        </p>
      </Col>
      <Col span={12}>
        <img src={group} alt="" />
      </Col>
    </Row>
  );
};

export default withoutAuth(HomePage);
