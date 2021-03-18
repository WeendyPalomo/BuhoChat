import React, { useEffect, useState } from "react";
import "../styles/ChatWindow.css";

import { Avatar, Button, Input, Tooltip, Upload, message, List } from "antd";
import { useAuth } from "../lib/auth";
import { db } from "../firebase/index";
import firebase from "firebase";
import {
  SendOutlined,
  UserOutlined,
  PictureOutlined,
  UploadOutlined,
} from "@ant-design/icons";







const { TextArea } = Input;

<<<<<<< HEAD

const ChatWindow = ({chat}) => {
=======
const ChatWindow = ({ chat }) => {
>>>>>>> 61c563a43798d1e956135304d058128de20ff1e3
  const [myMessages, setMyMessages] = useState([]);
  const [numMessages, setNumMessages] = useState(0);
  const { user } = useAuth();
  const [url, setUrl]=useState();


  const Uploader = () => {
    const props = {
      beforeUpload: (file) => {
        if (file.type !== "image/png") {
          message.error(`${file.name} is not a png file`);
        }
        return file.type === "image/png" ? true : Upload.LIST_IGNORE;
      },
      onChange: (info) => {
        console.log(info.fileList);
      },
    };
    return (
      <Upload {...props}>
        <Button icon={<PictureOutlined />} />
      </Upload>
    );
  };

  const handleSendMessage = () => {
    if (myMessages) {

  

  const handleSendMessage = () => {
    /* const messageContent = document.querySelector("#message-content").value;
    setMyMessages((prevState) => [messageContent, ...prevState]); */
    //if (myMessages) {

      const messageContent = document.querySelector("#message-content").value;
      const timestamp = Date.now();
      const timestampAll = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(timestamp);


      const newMessageKey = db.ref("messages/chatidexmaple2").push().key;
      db.ref("messages/chatidexmaple2/" + newMessageKey).set({
        name: user.email,
        timestamp: timestampAll,
        message: messageContent,
      });
    } else {

      if(chat) {
      const newMessageKey = db.ref('messages/'+chat.key).push().key
      
          db.ref('messages/'+chat.key+'/' + newMessageKey).set({
            name: user.email,
            timestamp: timestampAll,
            message: messageContent,
          })
        
        

      }
    const chatHistory = document.getElementById("chat-messages");
    console.log(chatHistory);
  };

  useEffect(() => {

    db.ref("messages/chatidexmaple2").on("child_added", (snapshot) => {
      console.log(snapshot.val());
      setMyMessages((prevState) => {
        return [...prevState, snapshot.val()];
      });
    });
    console.log("chat", chat);
  }, []);

    if(chat) {
      setMyMessages([]);
    db.ref("messages/" + chat.key).on("child_added", (snapshot) => {
      
      
        console.log(snapshot.val());
        setMyMessages((prevState) => {
          return [...prevState, snapshot.val()]
        })
      
      
    });
  }
    //db.ref("messages/chatidexmaple2").off()
    console.log("chat", chat);
  },[chat]);


  
>>>>>>> d0cbeeceaf9df4517d90072b297a4f2fe967b535

  return (
    <>
      <div id="chat-header">
        <Avatar size="large" icon={<UserOutlined />} />
        {chat ? (chat.receiverNickname) : "No existe"}
      </div>

      <div className="chat-messages">
        <List
<<<<<<< HEAD
          size="small"
          actions
          bordered
          dataSource={myMessages}
          renderItem={(item) => <List.Item>{item.message}</List.Item>}
=======
        size="small"
        actions
        
        dataSource={myMessages}
        renderItem={item => <List.Item><div className="mensaje">{item.message}</div></List.Item>}
>>>>>>> d0cbeeceaf9df4517d90072b297a4f2fe967b535
        />
      </div>

      <div className="chat-sender">
        <TextArea rows={2} id="message-content" />
        <Tooltip>
<<<<<<< HEAD
          <Uploader onClick={handleSendMessage} />
=======
          
>>>>>>> d0cbeeceaf9df4517d90072b297a4f2fe967b535
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
