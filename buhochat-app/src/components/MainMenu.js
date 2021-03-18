import React from "react";
import { useAuth } from "../lib/auth";
import Routes from "../constants/routes";
import { Avatar, Button, Col, Dropdown, Menu } from "antd";
import "../styles/MainMenu.css";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import ModalEditeProfile from "./ModalEditeProfile";
import ModalPrivacity from "./ModalPrivacity";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <Dropdown
          className="drop-main-menu"
          overlay={
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  <ModalEditeProfile />
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
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
            {user.nickname}
            <DownOutlined />
          </Button>
        </Dropdown>
      ) : (
        <>
          <Col span={3} offset={9} align="end">
            <Button className="buttom-login">
              <Link to={Routes.LOGIN}>Iniciar sesión</Link>
            </Button>
          </Col>
          <Col span={1} align="center">
            ó
          </Col>
          <Col span={3} align="start">
            <Button className="buttom-register">
              <Link to={Routes.REGISTER}>Registro</Link>{" "}
            </Button>
          </Col>
        </>
      )}
    </>
  );
};

export default MainMenu;
