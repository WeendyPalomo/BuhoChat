import React, {useEffect, useState} from 'react';
import Routes from "../constants/routes";
import {Button, Form, Input, Modal, Tooltip} from 'antd';
import {db} from "../firebase/index";
import "../styles/register.css";
import "../styles/ModalEditeProfile.css"
import 'antd/dist/antd.css';
import {useAuth} from "../lib/auth";
import {useHistory} from "react-router-dom";
import {QuestionCircleOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

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
  
  

const ModalEditeProfile = () => {
    const [form] = Form.useForm();
    const { register, user } = useAuth();
    const [updates, setUpdates]=useState([]);
    const history = useHistory();
    const onFinish = (data) => {
      console.log('Received values of form: ', data);
      register(data);
    };
  
    useEffect(() => {
      if (!!user) {
        history.replace(Routes.MENU);
      }
    }, [user]);



  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');

    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  function handleUpdateUser(userId,newNickme){
    const usersRef=db.ref(`users/${userId}`);
    usersRef.update(
      {    
        nickname: newNickme
      }
    )
  }

  return (
    <>
      <a type="primary" onClick={showModal}>
        Perfil
      </a>
      <Modal className="configureperfil"
        title="Tu Cuenta"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}        
      >

<Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

      <Form.Item
        name="name"
        label={
          <span>
            Nombre y Apellido
          </span>
        }
        rules={[
          {
            required: true,            
            whitespace: true,
          },
        ]}
      >
        <span>{user.name} {user.lastname}</span>
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
          },
        ]}
      >
        <span>{user.email}</span>
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
        <span>{user.nickname}</span>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
      </Form.Item>
    </Form>  
      
      </Modal>
    </>
  );
};

export default ModalEditeProfile;