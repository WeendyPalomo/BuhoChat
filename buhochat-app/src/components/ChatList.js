import React, {useEffect, useState} from "react";
import {Avatar, Button, List, message, Tooltip} from "antd";
import {auth, db} from "../firebase/index";
import {PlusOutlined} from "@ant-design/icons";
import "../styles/ChatList.css";

const data = [];

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState();
  const [newUid, setNewUid] = useState();
  const [auxUser, setAuxUser] = useState();
  const [maxUsers, setMaxUsers] = useState();

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
          db.ref(`users/${snapshot.val().userid}`).once("value", (snapshot) => {
            setAuxUser(snapshot.val());
          });
        } else {
          console.log("No data available");
        }
      });

      console.log("uid", uid);
    }
  }, [num]);
  function contains(Array, element) {
    Array.forEach((user) => {
      if (JSON.stringify(user) === JSON.stringify(element)) {
        return true;
      }
    });
    return false;
  }
  useEffect(() => {
    if (newUid) {
      console.log("USER", users);
      console.log("AUXUSER", auxUser);
      console.log("includes", !users.includes(auxUser));
      console.log("contains", !contains(users, auxUser));

      if (!users.includes(auxUser)) {
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
      } else {
        handleAddUserChat();
      }
    }
  }, [newUid]);

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
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <a href="https://ant.design" id="titleid">
                  {item.nickname}
                </a>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ChatList;
