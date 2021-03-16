import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {useAuth} from "../lib/auth";
import {useHistory} from "react-router-dom";
import Routes from "../constants/routes";
import {Button, Form, Input, message, Select, Tooltip} from "antd";
import translateMessage from "../utils/translateMessage";
import {QuestionCircleOutlined} from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const { register, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const onFinish = async (data) => {
    console.log("Received values of form: ", data);
    setLoading(true);
    try {
      await register(data);
    } catch (error) {
      const errorCode = error.code;
      message.error(translateMessage(errorCode));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!user) {
      history.replace(Routes.MENU);
    }
  }, [user]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label={<span>Nombre </span>}
        rules={[
          {
            required: true,
            message: "Porfavor ingresa tu nombre!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label={<span>Apellido</span>}
        rules={[
          {
            required: true,
            message: "Porfavor ingresa tu apellido!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Correo institucional"
        rules={[
          {
            type: "email",
            message: "Correo electrónico invalido!",
          },
          {
            required: true,
            message: "Porfavor ingresa tu correo electrónico!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: "Porfavor ingresa una contraseña.",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Contraseña"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Porfavor confirme su contraseña.",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("La contraseña que ingresó no coincide.")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="Como quisieras que te llamen los demás?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Ingresa tu nickname.",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout} className="register-buttom" >
        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
