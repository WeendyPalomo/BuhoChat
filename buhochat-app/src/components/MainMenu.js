import React from "react";
import {useAuth} from "../lib/auth";
import Routes from "../constants/routes";
import {Avatar, Button, Col, Dropdown, Menu} from "antd";
import "../styles/MainMenu.css";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import ModalEditeProfile from "./ModalEditeProfile";
import ModalPrivacity from "./ModalPrivacity";

const MainMenu = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <Dropdown className="drop-main-menu"
          overlay={
            <Menu>
              <Menu.Item>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  <ModalEditeProfile />
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                 
                >
                  <ModalPrivacity />
                </a>
              </Menu.Item>
              <Menu.Item>
                <Button type="link" onClick={logout}>
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          arrow
        >
          <Button>
            <Avatar size="small" icon={<UserOutlined />} />
            {user.email}
            <DownOutlined />
          </Button>
        </Dropdown>
      ) : (
        <>
           
          <Col span={3} offset={9} align="end">
            <Button className="buttom-login" href={Routes.LOGIN}>Iniciar sesión</Button>
          </Col>
          <Col span={1} align="center">
            ó
          </Col>
          <Col span={3} align="start">
            <Button className="buttom-register" href={Routes.REGISTER}>Registro</Button>
          </Col>
        
        </>
      )}
    </>
  );
};

export default MainMenu;
