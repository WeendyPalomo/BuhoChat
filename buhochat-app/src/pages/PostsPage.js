import React from "react";
import moment from "moment";
import "../styles/PostsPage.css";
import { Row, Col, Avatar, Upload, Space, message } from "antd";
import { useState, useEffect } from "react";
import { Button, Input, Switch, Modal, Form, List, Comment } from "antd";
import {Link} from "react-router-dom";
import {
  HeartOutlined,
  PlusOutlined,
  UploadOutlined,
  SaveOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { db } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useAuth } from "../lib/auth";
import withAuth from "../hocs/withAuth";
import CommentForm from "../components/CommentForm";
import ListOfPosts from "../components/ListOfPosts";
import UploadImagePost from "../components/UploadImagePost";
import Routes from "../constants/routes";
const { TextArea } = Input;
const { Item } = Form;

const PostPage = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [inputTitle, setInputTitle] = useState("");
  const [inputTextArea, setInputTextArea] = useState("");
  const [posts, setPosts] = useState([]);
  const [imageToUp, setImageToUp] = useState("");

  // const props = {
  //   action: "//jsonplaceholder.typicode.com/posts/",
  //   listType: "picture",
  //   previewFile(file) {
  //     console.log("Your upload file:", file);
  //     // Your process logic. Here we just mock to the same file
  //     return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
  //       method: "POST",
  //       body: file,
  //     })
  //       .then((res) => res.json())
  //       .then(({ thumbnail }) => thumbnail);
  //   },
  // };

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
        <UploadImagePost />
      </>
    );
  };
  const [name, setName] = useState("");
  //const postListRef = db.ref("posts");

  const handleWriteData = async () => {
    if (name) {
      const poston = moment();
      const newPostID = db.ref().push().key;
      console.log("new posu", newPostID);
      await db.ref(`posts/${newPostID}`).set({
        title: inputTitle,
        content: inputTextArea,
        userid: user.uid,
        poston: poston.format("LLLL"),
        postid: newPostID,
        image: imageToUp,
        nickname: name,
      });
    } else {
      console.log("no hay name");
    }
    console.log("USER", user);
    // console.log("INPUT TITLE", inputTitle);
    // console.log("TEXTAREA", inputTextArea);
    // console.log("USER ID", user.uid);
    // console.log("POST ON", poston);
    // console.log("POST ID", newPostID);
    // console.log("IMAGE", imageToUp);
  };
  useEffect(() => {
    db.ref("posts").on("value", (snapshot) => {
      const postsArray = [];
      snapshot.forEach((post) => {
        console.log("POSTS", post.val().postid);
        postsArray.push(post.val());
      });
      setPosts(postsArray);
    });
  }, []);

  useEffect(() => {
    db.ref(`users/${user.uid}`).once("value", (snapshot) => {
      console.log("SNAPSHOT NAME", snapshot.val().nickname);
      setName(snapshot.val().nickname);
    });
  }, []);

  const handleOkPostModal = () => {
    handleWriteData();

    setModalText("Publicando actualizaciones");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    setInputTitle("");
    //setInputTextArea("");
  };

  const handleCancelPostModal = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  // const [dropdown, setDropdown] = useState(false);
  // const abrircerrarDropdown = () => {
  //   setDropdown(!dropdown);
  // };
  //
  // const [isModalVisible, setIsModalVisible] = useState(false);
  //
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  //
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  //
  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  return (
    <Row justify="center">
      <div className="site-layout-content">
        <div class="navigation-buttons">
          <Button
            type="primary"
            shape="round"
            style={{ background: "#C9CCCB", color: "white" }}
          >
            <Link to={Routes.POSTS}>Posts</Link>
          </Button>
          <Button
            type="primary"
            shape="round"
            style={{ background: "#454C48", color: "white" }}
          >
           <Link to={Routes.CHAT}>CHAT</Link>
          </Button>
        </div>
        <div class="contenedor-barra">
          <div class="interno">
            <div class="redondeado">
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
              <Switch checkedChildren="Anonimo" unCheckedChildren="" />
              <div id="anonimo"></div>
            </div>
          </div>
        </div>

        {posts
          ? posts.map((post) => {
              return (
                <Row justify="center">
                  <Col span={18}>
                    <div className="post">
                      <div className="site-layout-content">
                        <div className="site-card-border-less-wrapper">
                          <div className="ant-card">
                            <div className="ant-card-head">
                              
                                <Row>
                                    <Col span={12}>
                                      <div className="ant-card-head-title">
                                          <h1 id="title">{post.title}</h1>
                                      </div>
                                    </Col>
                                    <Col span={12} >
                                      <div className="botones">
                                        <Row>
                                          <Col span={12}></Col>
                                          <Col span={12}>
                                            <Row justify="end">
                                              <Col span={8}>
                                                {/*<Dropdown*/}
                                                {/*  isOpen={dropdown}*/}
                                                {/*  toggle={abrircerrarDropdown}*/}
                                                {/*  shape="square"*/}
                                                {/*>*/}
                                                {/*  <DropdownToggle>...</DropdownToggle>*/}
                                                {/*  <DropdownMenu>*/}
                                                {/*    <DropdownItem onClick={showModal}>*/}
                                                {/*      reportar*/}
                                                {/*    </DropdownItem>*/}
                                                {/*    /!*<Modal*!/*/}
                                                {/*    /!*  title="Reportar"*!/*/}
                                                {/*    /!*  visible={isModalVisible}*!/*/}
                                                {/*    /!*  onOk={handleOk}*!/*/}
                                                {/*    /!*  onCancel={handleCancel}*!/*/}
                                                {/*    /!*>*!/*/}
                                                {/*    /!*  <p>Some contents...</p>*!/*/}
                                                {/*    /!*  <p>Some contents...</p>*!/*/}
                                                {/*    /!*  <p>Some contents...</p>*!/*/}
                                                {/*    /!*</Modal>*!/*/}
                                                {/*    <DropdownItem>guardar</DropdownItem>*/}
                                                {/*  </DropdownMenu>*/}
                                                {/*</Dropdown>*/}
                                                <Button type="primary"  shape="square">
                                                  <WarningOutlined />
                                                </Button>
                                              </Col>
                                              <Col span={8}>
                                                <Button type="primary" shape="square">
                                                  <SaveOutlined />
                                                </Button>
                                              </Col>
                                              <Col span={8}>
                                                <Button type="primary" shape="square">
                                                  <HeartOutlined />
                                                </Button>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                        
                                      </div>
                                    </Col>
   
                                 </Row>
                              
                            </div>
                            <Row justify="start">
                              <Col span={18}>
                                <div className="ant-card-body">
                                  {/*<Row>*/}
                                  {/*  <Col>*/}
                                  {/*    <Row>{post.content}</Row>*/}
                                  {/*    <Row>*/}
                                  {/*      <Col span={10} offset={10}>*/}
                                  {/*        {post.userid}*/}
                                  {/*      </Col>*/}
                                  {/*    </Row>*/}
                                  {/*    <Row>{post.poston}</Row>*/}
                                  {/*  </Col>*/}
                                  {/*</Row>*/}
                                  <Row>
                                    <div>
                                      <p>{post.content}</p>
                                    </div>
                                  </Row>

                                  <Row>
                                    <div className="usuario">
                                      <div className="users">
                                        <p id="user">{post.userid}</p>
                                      </div>
                                    </div>
                                  </Row>
                                  <Row>
                                    <div>
                                      <p>{post.poston}</p>
                                    </div>
                                  </Row>
                                  <CommentForm />
                                </div>
                              </Col>
                            </Row>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              );
            })
          : "No hay posts para mostrar"}
      </div>
    </Row>
  );
};

export default withAuth(PostPage);
