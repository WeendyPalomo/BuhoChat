import React from "react";
import withoutAuth from "../hocs/withoutAuth";
import {Col, Row, Typography} from "antd";
import LoginForm from "../components/LoginForm";
import "../styles/App.css";
import "../styles/LoginPage.css";





const LoginPage = () => {
  return (
    <Row className="login-page">
      <Col span={12} align="center">
        <img
          id="epn-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png"
          alt=""
        />
        <p className="description-epn-logo" level={4}>
          Únete a la comunidad politécnica y encuentra nuevos colegas.
        </p>
      </Col>
      <Col className="form-col" span={12} align="center">
        <div className="loginForm-div">
          <LoginForm />
        </div>
      </Col>
    </Row>
  );
};

export default withoutAuth(LoginPage);
