import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";

import "../styles/LoginForm.css";
import { Link, useHistory } from "react-router-dom";
import Routes from "../constants/routes";
import { useAuth } from "../lib/auth";

const LoginForm = () => {
  const { login, user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!!user) {
      history.replace(Routes.MENU);
    }
  }, [user]);

  const onFinish = ({ email, password, remember }) => {
    login(email, password);
    console.log(remember);
    console.log(email);
    console.log(password);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
  if (user === null) {
    return "Verificando sesiónes...";
  }
};

export default LoginForm;
