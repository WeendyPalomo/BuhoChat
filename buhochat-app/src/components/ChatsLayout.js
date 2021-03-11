import { React, useEffect, useState } from "react";
import "../styles/ChatsLayout.css";
import { Layout, Button, Input, Avatar, Tooltip } from "antd";
import InfiniteListExample from "./InfiniteListExample";
import { UserOutlined, SendOutlined } from "@ant-design/icons";

//const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const ChatsLayout = () => {
  const [myMessages, setMyMessages] = useState([]);

  const handleSendMessage = () => {
    const messageContent = document.querySelector("#message-content").value;

    setMyMessages((prevState) => [...prevState, messageContent]);
  };

  return (
    <div className="site-layout-content">
      <div class="navigation-buttons">
        <Button
          type="primary"
          shape="round"
          style={{ background: "#454C48", color: "white" }}
        >
          Posts
        </Button>
        <Button
          type="primary"
          shape="round"
          style={{ background: "#C9CCCB", color: "white" }}
        >
          Chats
        </Button>
      </div>
      <div class="main-content">
        <div class="chats-list">
          <Input placeholder="Buscar usuarios, amigos" id="search-chat" />
          <InfiniteListExample />
        </div>
        <div class="chat-window">
          <div id="chat-header">
            <Avatar size="large" icon={<UserOutlined />} />
            User 2
          </div>
          <div class="chat-messages">
            {myMessages.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
          <div class="chat-sender">
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
      </div>
    </div>
  );
};

export default ChatsLayout;
