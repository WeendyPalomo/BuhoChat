import React, {useEffect, useState} from "react";
import {Avatar, Button, List, message, Tooltip} from "antd";
import {auth, db} from "../firebase/index";
import {PlusOutlined,UnorderedListOutlined,RightOutlined} from "@ant-design/icons";
import "../styles/ChatList.css";

const data = [];

const ChatList = ({onChange}) => {
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState();
  const [newUid, setNewUid] = useState();
  const [auxUser, setAuxUser] = useState();
  const [maxUsers, setMaxUsers] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    console.log("num", num);
    if (num) {
      const currentUser = auth.currentUser;

      const name = currentUser.displayName;
      const uid = currentUser.uid;

      db.ref(`userschats/${num}`).once("value", (snapshot) => {
        if (snapshot.exists()) {
          setNewUid(snapshot.val().userid);
          console.log("newUid", snapshot.val().userid);
        } else {
          console.log("No data available");
        }
      });

      console.log("uid", uid);
    }
  }, [num]);
  useEffect(() => {
    if (newUid) {
      db.ref(`users/${newUid}`).once("value", (snapshot) => {
        setAuxUser(snapshot.val());
      });
    }
  }, [newUid]);
  function contains(Array, element) {
    var contain = false;
    Array.forEach((user) => {
      console.log("userEmail", user.email);
      console.log("elementEmail", element.email);
      if (user.email === element.email) {
        contain = true;
        console.log("contain dentro", contain);
      }
    });

    return contain;
  }
  useEffect(() => {
    if (auxUser) {
      console.log("USER", users);
      console.log("AUXUSER", auxUser);

      console.log("contains", contains(users, auxUser));

      if (!contains(users, auxUser) && newUid != auth.currentUser.uid) {
        db.ref(`users/${newUid}`).once("value", (snapshot) => {
          const newUser = {
            email: snapshot.val().email,
            lastname: snapshot.val().lastname,
            name: snapshot.val().name,
            nickname: snapshot.val().nickname,
          };
          setUsers((prevState) => {
            return [newUser, ...prevState];
          });
        });
        const chatData = {
          lastMessage: " ",
          userid1: auth.currentUser.uid,
          userid2: newUid
        };
        const updateuserData = {
          uidContact: newUid

        };
        const updateCurrentUserData = {
          uidContact: auth.currentUser.uid
        }
        const newChatKey = db.ref().child('chats').push().key;
        /*var updates = {};
        updates["/chats/" + newChatKey] = chatData;
        updates["/users/" + auth.currentUser.uid + "/" + "chats/" +newChatKey] = updateuserData;
        updates["/users/" + newUid + "/" + "chats/" +newChatKey] = updateCurrentUserData; */
        setChats((prevState) => {
          const newChat = {
            key: newChatKey,
            lastMessage: " ",
            receiverNickname: auxUser.nickname
          }
          return [...prevState, newChat];
        })
      } else {
        handleAddUserChat();
      }
    }
  }, [auxUser]);

  useEffect(() => {
    const random = db.ref("/users").once("value", (snapshot) => {
      setMaxUsers(snapshot.numChildren());
      console.log();
    });
  }, []);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleAddUserChat = () => {
    console.log("maxUsers", maxUsers);
    console.log("users.lenght", users.length);
    if (maxUsers >= users.length) {
      const random = db
        .ref("/users")
        .once("value")
        .then((snapshot) => getRandomInt(1, snapshot.numChildren()));

      random.then((num) => {
        setNum(num);
        console.log("dentro", num);
      });
    } else {
      message.warning("No existen más usuarios");
    }
    //var newUid = getAnotherUser();
    /* console.log("definitiveuid", newUid); */
  };

   const setOnChange = (chat) => {
    console.log(chat);
    onChange = chat;
    console.log(onChange)
  } 

  return (
    <>
      <Tooltip title="Siguiente Usuario">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          danger
          onClick={handleAddUserChat}
        />
      </Tooltip>
      <List
        itemLayout="horizontal"
        dataSource={chats}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title=
                
                  {item.receiverNickname}
                
              
              description={item.lastMessage}
              //actions = {onChange()}
            />
            <Button shape="circle" icon={<RightOutlined />} onClick={setOnChange(item)}/>
            <Button shape="circle" icon={<UnorderedListOutlined />} />
          </List.Item>
        )}
      />
    </>
  );
};

export default ChatList;
