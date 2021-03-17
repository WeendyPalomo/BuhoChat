import React, {useEffect, useState} from "react";
import "../styles/ChatWindow.css";
import {Avatar, Button, Input, Tooltip, Upload, message} from "antd";
import {useAuth} from "../lib/auth";
import {db} from "../firebase/index";
import firebase from "firebase";
import {SendOutlined, UserOutlined,PictureOutlined, UploadOutlined} from "@ant-design/icons";

const { TextArea } = Input;

const ChatWindow = (props) => {
  const [myMessages, setMyMessages] = useState([]);
  const [numMessages, setNumMessages] = useState(0);
  const { user } = useAuth();

  const Uploader = () => {
    const props = {
      beforeUpload: file => {
        if (file.type !== 'image/png') {
          message.error(`${file.name} no es un archivo PNG`);
        }
        return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
      },
      onChange: info => {
        console.log(info.fileList);
      },
    };
    return (
      <Upload {...props}>
        <Button icon={<PictureOutlined />}/>
      </Upload>
    );
  };

  const handleSendMessage = () => {
    /* const messageContent = document.querySelector("#message-content").value;
    setMyMessages((prevState) => [messageContent, ...prevState]); */
    if (myMessages) {
      const messageContent = document.querySelector("#message-content").value;
      const timestamp = Date.now();
      const timestampAll = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(timestamp);
      firebase.database().ref(`messages/chatidexample/${numMessages}`).set({
        name: user.email,
        timestamp: timestampAll,
        message: messageContent,
      });
    } else {
      console.log("no cambia");
    }
    const chatHistory = document.getElementById("chat-messages");
    console.log(chatHistory);
  };
  useEffect(() => {
    const messageRef = db.ref("messages/chatidexample");
    messageRef.on("value", (snapshot) => {
      const message = snapshot.val();
      console.log("myMessages", message);
      console.log("messagesCount", snapshot.numChildren());
      if (numMessages != snapshot.numChildren()) {
        setNumMessages(snapshot.numChildren());
      }
    });
  });

  useEffect(() => {
    db.ref("messages/chatidexample").once("value", (snapshot) => {
      const messagesArray = [];
      snapshot.forEach((message) => {
        messagesArray.push(message.val().message);
      });
      setMyMessages(messagesArray);
    });
  }, [numMessages]);

  useEffect(() => {}, [myMessages]);

  return (
    <>
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
        <Tooltip>
          <Uploader
          onClick={handleSendMessage}
          />
        </Tooltip>
        <Tooltip title="send">
          <Button
            onClick={handleSendMessage}
            shape="circle"
            size="large"
            icon={<SendOutlined />}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default ChatWindow;
