import { React, useEffect, useState } from "react";
import "../styles/ChatsPage.css";
import { Layout, Button, Input, Avatar, Tooltip } from "antd";
import ChatList from "../components/ChatList";
import {
  UserOutlined,
  SendOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import withAuth from "../hocs/withAuth";

const { TextArea } = Input;

const ChatsPage = () => {
  const [myMessages, setMyMessages] = useState([]);

  const handleSendMessage = () => {
    const messageContent = document.querySelector("#message-content").value;

    setMyMessages((prevState) => [...prevState, messageContent]);
  };

  return (
    <div id="chat-content" className="site-layout-content">
      <div className="navigation-buttons">
        <Button
        id="post-button-navg"
          type="primary"
          shape="round"
          style={{ background: "#454C48", color: "white" }}
        >
          Posts
        </Button>
        <Button
        id="chat-button-navg"
          type="primary"
          shape="round"
          style={{ background: "#C9CCCB", color: "white" ,}}
        >
          Chats
        </Button>
      </div>
      <div className="main-content">
        <div className="chats-list">
          <Input placeholder="Buscar usuarios, amigos" id="search-chat" />
          <div className="demo-infinite-container">
            <ChatList />
          </div>
        </div>
        <div class="chat-window">
          <div id="chat-header">
            <Avatar size="large" icon={<UserOutlined />} />
            User 2
          </div>

          <div className="chat-messages">
            {myMessages.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          <div className="chat-sender">
            <TextArea rows={2} id="message-content" />
            <Tooltip title="send">
              <Button
                onClick={handleSendMessage}
                shape="circle"
                size="large"
                icon={<SendOutlined />}
              />
            </Tooltip>
          </div>
        </div>
        {/* <Tooltip title="Siguiente Usuario">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            id="next-user"
            danger
          />
        </Tooltip> */}
      </div>
    </div>
  );
};

export default withAuth(ChatsPage);
