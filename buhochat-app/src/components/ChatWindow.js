import React, {useEffect, useState} from "react";
import "../styles/ChatWindow.css";
import {Avatar, Button, Input, Tooltip, Upload, message, List, Image} from "antd";
import {useAuth} from "../lib/auth";
import {db} from "../firebase/index";


import {SendOutlined, UserOutlined,PictureOutlined, UploadOutlined} from "@ant-design/icons";

const { TextArea } = Input;

const ChatWindow = ({chat}) => {
  const [myMessages, setMyMessages] = useState([]);
  const [numMessages, setNumMessages] = useState(0);
  const { user } = useAuth();
  const [url, setUrl]=useState();

  

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
      if(chat) {
      const newMessageKey = db.ref('messages/'+chat.key).push().key
      
          db.ref('messages/'+chat.key+'/' + newMessageKey).set({
            name: user.email,
            timestamp: timestampAll,
            message: messageContent,
          })
        
        

      }
    /* } else {
      console.log("no cambia");
    } */
    const chatHistory = document.getElementById("chat-messages");
    console.log(chatHistory);
    
    
    
  };

  
  useEffect(() => {
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


  

  return (
    <>
      <div id="chat-header">
        <Avatar size="large" icon={<UserOutlined />} />
        {chat ? (chat.receiverNickname) : "No existe"}
      </div>

      <div className="chat-messages">
        <List
        size="small"
        actions
        
        dataSource={myMessages}
        renderItem={item => <List.Item><div className="mensaje">{item.message}</div></List.Item>}
        />
      </div>

      <div className="chat-sender">
        <TextArea rows={2} id="message-content" />
        <Tooltip>
          
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
