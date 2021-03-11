import React from "react";
import "../styles/PostsPage.css";
import { Row, Col } from "antd";
import { useState } from "react";
import { Button, Input, Switch, Modal } from "antd";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const PostPage = () => {
  const [dropdown, setDropdown] = useState(false);
  const abrircerrarDropdown = () => {
    setDropdown(!dropdown);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="site-layout-content">
      <div class="navigation-buttons">
        <Button
          type="primary"
          shape="round"
          style={{ background: "#C9CCCB", color: "white" }}
        >
          Posts
        </Button>
        <Button
          type="primary"
          shape="round"
          style={{ background: "#454C48", color: "white" }}
        >
          Chats
        </Button>
      </div>
      <div class="contenedor-barra">
        <div class="interno">
          <div class="redondeado">
            <Input placeholder="enter topic..." />
            <div id="anonimo">
              <Switch checkedChildren="Anonimo" unCheckedChildren="" />
            </div>
          </div>
        </div>
      </div>

      <div class="post">
        <div className="site-layout-content">
          <div className="site-card-border-less-wrapper">
            <div class="ant-card">
              <div class="ant-card-head">
                <div class="ant-card-head-wrapper">
                  <div class="botones">
                    <Row>
                      <Col span={8}>
                        <Dropdown
                          isOpen={dropdown}
                          toggle={abrircerrarDropdown}
                          shape="square"
                        >
                          <DropdownToggle>...</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={showModal}>
                              reportar
                            </DropdownItem>
                            <Modal
                              title="Reportar"
                              visible={isModalVisible}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <p>Some contents...</p>
                              <p>Some contents...</p>
                              <p>Some contents...</p>
                            </Modal>
                            <DropdownItem>guardar</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                      <Col span={8}>
                        <Button type="primary" shape="square">
                          <PlusOutlined />
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button type="primary" shape="square">
                          <HeartOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div class="ant-card-head-title">
                    <h1 id="title">Nuevas Aulas Virtuales</h1>
                  </div>
                </div>
              </div>
              <div class="ant-card-body">
                <pr>
                  La Escuela Politecnica Nacional pensando en mejorar nuestra
                  experiencia en educación virtual, han actualizado la
                  plataforma a unas nuevas. Para el semestre 2020-B sea las
                  aulas más colaborativas, tiene mejores funcionalidades, mayor
                  seguridad y una mejor interacción entre profesores y
                  estudiantes.
                </pr>

                <pr>
                  El nuevo acceso a la nueva plataforma es a través de la URL
                  "https://aulasvirtuales.epn.edu.ec/". Recuerde que para el
                  ingreso deberá utilizar las credenciales de nuestro correo
                  institucional.
                </pr>
                <div class="usuario">
                  <div class="users">
                    <pr id="user"> -Anonimo</pr>
                  </div>
                </div>

                <pr>Miercoles 9, Diciembre del 2020 22:15</pr>
              </div>
            </div>
          </div>
          ,
        </div>
      </div>
    </div>
  );
};

export default PostPage;
