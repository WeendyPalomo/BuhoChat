import React from "react";
import moment from "moment";
import "../styles/PostsPage.css";
import { useState, useEffect } from "react";
import { Button, Input, Switch, Modal, Row, Col, message } from "antd";
import { db } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../lib/auth";
import withAuth from "../hocs/withAuth";
import ListOfPosts from "../components/ListOfPosts";
import UploadImagePost from "../components/UploadImagePost";
import Routes from "../constants/routes";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
const { TextArea } = Input;
const PostPage = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputTextArea, setInputTextArea] = useState("");
  const [posts, setPosts] = useState([]);
  const [imageToUp, setImageToUp] = useState("");
  const [postIDs, setPostIDs] = useState([]);

  const showPostModal = () => {
    setVisible(true);
    setModalText(
      <>
        <TextArea
          defaultValue={setInputTextArea}
          placeholder="Escribe un texto interesante ..."
          allowClear="true"
          rows={5}
          onChange={(e) => {
            setInputTextArea(e.target.value);
          }}
        />
        {/*<UploadImagePost />*/}
      </>
    );
  };

  
  
  const handleWriteData = async () => {
    let postIdArray = [];
    const poston = moment();
    const newPostID = db.ref().push().key;
    setPostIDs((prevState) => {
      return [...prevState, newPostID];
    });
    //postIdArray = [...postIdArray, newPostID];
    console.log("new post", newPostID);
    await db.ref(`posts/${newPostID}`).set({
      title: inputTitle,
      content: inputTextArea,
      userid: user.uid,
      poston: poston.format("LLLL"),
      postid: newPostID,
      // image: imageToUp,
      nickname: user.nickname,
    });
    //setPostIDs(postIdArray);
    //await handleWriteComments(postIDs);
  };

  // useEffect(() => {
  //   //handleWriteComments(postIDs);
  //   //console.log("ARREGLO DE POST IDS", postIDs);
  // }, [postIDs]);

  const handleWriteComments = async (postIdArray) => {
    await postIdArray.forEach((newPost) => {
      db.ref(`comments/${newPost}`).set("");
    });
  };

  useEffect(() => {
    db.ref("posts").on("value", (snapshot) => {
      const postsArray = [];
      snapshot.forEach((post) => {
        postsArray.push(post.val());
      });
      setPosts(postsArray);
    });
    return () => {
      db.ref("posts").off();
    };
  }, []);

  const handleOkPostModal = async () => {
    if (inputTextArea !== "" && inputTitle !== "") {
      await handleWriteData();
      setModalText("Publicando actualizaciones");
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 500);
      setInputTitle("");
    } else {
      message.error("Algún campo está vacío");
    }
  };

  const handleCancelPostModal = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <Row justify="center">
      <div className="site-layout-content">
        <div class="navigation-buttons">
          <Button
            type="primary"
            shape="round"
            style={{ background: "#C9CCCB", color: "white" }}
            disabled={true}
          >
            Posts
          </Button>
          <Button
            type="primary"
            shape="round"
            style={{ background: "#454C48", color: "white" }}
          >
            <Link to={Routes.CHAT}>Chats</Link>
          </Button>
        </div>
        <div className="contenedor-barra">
          <div className="interno">
            <div className="redondeado">
              <Input placeholder="Comparte tus ideas " disabled="true" />
              <Button type="primary" onClick={showPostModal}>
                Nuevo Post
              </Button>
              <Modal
                title={
                  <Input
                    value={inputTitle}
                    defaultValue={inputTitle}
                    placeholder="Dale un título a tu post"
                    onChange={(e) => setInputTitle(e.target.value)}
                  />
                }
                visible={visible}
                onOk={handleOkPostModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancelPostModal}
              >
                <p>{modalText}</p>
              </Modal>
              {/*<Switch checkedChildren="Anonimo" unCheckedChildren="" />*/}
              {/*<div id="anonimo"></div>*/}
            </div>
          </div>
        </div>
        {posts ? (
          <Row justify="center">
            <Col span={22}>
              <ListOfPosts posts={posts} postIDs={postIDs} />
            </Col>
          </Row>
        ) : (
          "No hay posts para mostrar"
        )}
      </div>
    </Row>
  );
};
export default withAuth(PostPage);
