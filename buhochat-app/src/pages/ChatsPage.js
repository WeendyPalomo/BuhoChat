import React from "react";
import "../styles/ChatsPage.css";
import { Button, Input } from "antd";
import ChatList from "../components/ChatList";
import withAuth from "../hocs/withAuth";
import ChatWindow from "../components/ChatWindow";
import { Link } from "react-router-dom";
import Routes from "../constants/routes";

const { TextArea } = Input;

const ChatsPage = () => {
  return (
    <div id="chat-content" className="site-layout-content">
      <div className="navigation-buttons">
        <Button
          id="post-button-navg"
          type="primary"
          shape="round"
          style={{ background: "#454C48", color: "white" }}
        >
          <Link to={Routes.POSTS}>Posts</Link>
        </Button>
        <Button
          id="chat-button-navg"
          type="primary"
          shape="round"
          style={{ background: "#C9CCCB", color: "white" }}
        >
          <Link to={Routes.CHAT}>Chats</Link>
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
          <ChatWindow name="chatid" />
        </div>
      </div>
    </div>
  );
};

export default withAuth(ChatsPage);
