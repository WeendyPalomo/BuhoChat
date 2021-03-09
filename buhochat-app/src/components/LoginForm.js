import React from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/LoginForm.css";

const LoginForm = () => {
  return (
    <Row justify="center">
      <Col>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          //onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Correo Institucional"
            rules={[{ required: true, message: "Please input your Username!" }]}
          />
          <Form.Item>
            <Input
              className="email-input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="username01@epn.edu.ec"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "Please input your Password!" }]}
          />
          <Form.Item>
            <Input
              className="pass-input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="abcdefg12345."
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="non-checked" noStyle>
              <Checkbox>Mantener sesión</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              ¿Olvidaste tu contraseña?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Iniciar sesión
            </Button>
          </Form.Item>
          <Form.Item>
            ó <a href="">Registrate ahora!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;