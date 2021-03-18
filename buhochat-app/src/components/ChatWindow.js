import React, {useEffect, useState} from "react";
import "../styles/ChatWindow.css";
import {Avatar, Button, Input, Tooltip, Upload, message, List} from "antd";
import {useAuth} from "../lib/auth";
import {db} from "../firebase/index";
import firebase from "firebase";
import {SendOutlined, UserOutlined,PictureOutlined, UploadOutlined} from "@ant-design/icons";

const { TextArea } = Input;

const ChatWindow = ({chat}) => {
  const [myMessages, setMyMessages] = useState([]);
  const [numMessages, setNumMessages] = useState(0);
  const { user } = useAuth();

  const Uploader = () => {
    const props = {
      beforeUpload: file => {
        if (file.type !== 'image/png') {
          message.error(`${file.name} is not a png file`);
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
      /* firebase.database().ref(`messages/chatidexample/${numMessages}`).set({
        name: user.email,
        timestamp: timestampAll,
        message: messageContent,
      }); */
      const newMessageKey = db.ref('messages/chatidexmaple2').push().key
               db.ref('messages/chatidexmaple2/' + newMessageKey).set({
        name: user.email,
        timestamp: timestampAll,
        message: messageContent,
      })


    } else {
      console.log("no cambia");
    }
    const chatHistory = document.getElementById("chat-messages");
    console.log(chatHistory);
    scrollToEnd();
    /* db.ref("messages/chatidexmaple2").on("child_added", (snapshot) => {
      
      
        console.log(snapshot.val());
        setMyMessages((prevState) => {
          return [...prevState, snapshot.val()]
        })
      
      
    });
    db.ref("messages/chatidexmaple2").off() */
    
  };

  function scrollToEnd(){
	var chatList = document.getElementById("chat-messages");
	chatList.scrollTop = chatList.scrollHeight;
  }
  useEffect(() => {
    db.ref("messages/chatidexmaple2").on("child_added", (snapshot) => {
      
      
        console.log(snapshot.val());
        setMyMessages((prevState) => {
          return [...prevState, snapshot.val()]
        })
      
      
    });
    //db.ref("messages/chatidexmaple2").off()
    console.log("chat", chat);
  },[]);


  

  return (
    <>
      <div id="chat-header">
        <Avatar size="large" icon={<UserOutlined />} />
        wendy9899
      </div>

      <div className="chat-messages">
        <List
        size="small"
        actions
        bordered
        dataSource={myMessages}
        renderItem={item => <List.Item>{item.message}</List.Item>}
        />
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
