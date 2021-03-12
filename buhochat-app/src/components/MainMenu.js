import React from "react";
import { useAuth } from "../lib/auth";
import Routes from "../constants/routes";
import { Menu, Dropdown, Button, Avatar, Col } from "antd";
import "../styles/MainMenu.css";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const MainMenu = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.antgroup.com"
                >
                  Perfil
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.aliyun.com"
                >
                  Privacidad
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
            <Button href={Routes.LOGIN}>Iniciar sesión</Button>
          </Col>
          <Col span={1} align="center">
            ó
          </Col>
          <Col span={3} align="start">
            <Button href={Routes.REGISTER}>Registro</Button>
          </Col>
        </>
      )}
    </>
  );
};

export default MainMenu;
