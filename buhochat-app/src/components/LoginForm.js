import React, {useEffect, useState} from "react";
import {Button, Checkbox, Form, Input, message} from "antd";
import translateMessage from "../utils/translateMessage";
import "../styles/LoginForm.css";
import {useHistory} from "react-router-dom";
import Routes from "../constants/routes";
import {useAuth} from "../lib/auth";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!!user) {
      history.replace(Routes.MENU);
    }
  }, [user]);

  
  const onFinish = async ({ email, password, remember }) => {
    setLoading(true);
    try {
      await login(email, password);
      //setLoading(false);
    } catch (error) {
      const errorCode = error.code;
      message.error(translateMessage(errorCode));
      setLoading(false);
    }

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

  if (user === null) {
    return "Verificando sesiónes...";
  }
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

      <Form.Item {...tailLayout} name="remember" className="checkbox-login-form" valuePropName="checked">
        <Checkbox >Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button className="buttom-login-form" type="primary" htmlType="submit" loading={loading}>
          <strong>
          Inicia Sesion
          </strong>         
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
