import React from "react";
import { Col, Row, Typography } from "antd";
import LoginForm from "../components/LoginForm";
import "../styles/App.css";
import "../styles/LoginPage.css";

const { Title } = Typography;

const LoginPage = () => {
  return (
    <Row>
      <Col span={12} align="center">
        <Title>BúhoChat</Title>
        <img
          id="epn-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png"
          alt=""
        />
        <Title level={4}>
          Únete a la comunidad politécnica y encuentra nuevos colegas.
        </Title>
      </Col>
      <Col className="form-col" span={12} align="center">
        <Title level={2}>Registrate o Inicia Sesión</Title>
        <div className="loginForm-div">
          <LoginForm />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
