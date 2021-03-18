import React, { useState, useEffect } from "react";
import { Collapse, Modal, Input, Descriptions, Table } from "antd";
import "../styles/ModalEditeProfile.css";
import "antd/dist/antd.css";
import { useAuth } from "../lib/auth";
import { db } from "../firebase";

const ModalPrivacity = () => {
  const { user } = useAuth();
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

  const { Panel } = Collapse;
  function callback(key) {
    //console.log(`SE ACTIVA EL QUE TIENE KEY ${text}`);
  }
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
    `;

  const [savedPostIDs, setSavedPostIDs] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    db.ref(`savedposts/${user.uid}`).on("value", (snapshot) => {
      console.log("POSTS SAVES", snapshot.val());
      setSavedPostIDs(snapshot.val());
    });

    return () => {
      console.log("SE DESMONTO");
      db.ref("savedposts").off();
    };
  }, []);

  useEffect(() => {
    if (!!savedPostIDs) {
      const auxArray = savedPostIDs;
      auxArray.forEach((id) => {
        db.ref(`posts/${id}`).on("value", (snapshot) => {
          console.log("INFORMARIOCN DE POST", snapshot.val());
        });
      });
    }
  }, [savedPostIDs]);

  //const auxF = async () =>{

  //}

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
  ];

  const showSavedPost = () => {
    console.log("CUANDO SE DESPLIGA");
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Privacidad
      </a>

      <Modal
        title="Privacidad"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div class="contentenedor">
          <Collapse
            className="privacidad-collapse"
            defaultActiveKey={["1"]}
            onChange={callback}
          >
            <Panel header="Usuarios Añadidos" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Usuarios Bloqueados" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="Publicaciones Reportadas" key="3">
              <p>{text}</p>
            </Panel>
            <Panel
              header="Publicaciones Guardadas"
              key="4"
              onChange={showSavedPost}
            >
              <p>{savedPosts}</p>
            </Panel>
            <Panel header="Anonimo" key="5">
              <p>{text}</p>
            </Panel>
          </Collapse>
          ,
        </div>
      </Modal>
    </>
  );
};
export default ModalPrivacity;
