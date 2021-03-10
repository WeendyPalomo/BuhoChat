import React, { useState } from 'react';
import "../styles/register.css"
import 'antd/dist/antd.css';
import { useAuth } from "../lib/auth";
import {
  Form,
  Input,
  Tooltip,
  Select,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
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
  const { register } = useAuth();
  const onFinish = ({nameAndLastName, email, password, confirm, nickname }) => {
    console.log('Received values of form: ', email, password);
    register({email, password});
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

      <Form.Item
        name="nameAndLastname"
        label={
          <span>
            Nombre y Apellido
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Porfavor ingresa tu nombre y apellido!',
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
            type: 'email',
            message: 'Correo electrónico invalido!',
          },
          {
            required: true,
            message: 'Porfavor ingresa tu correo electrónico!',
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
            message: 'Porfavor ingresa una contraseña.',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Contraseña"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Porfavor confirme su contraseña.',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('La contraseña que ingresó no coincide.'));
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
            message: 'Ingresa tu nickname.',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form.Item>
    </Form>

  );
};

export default RegistrationForm