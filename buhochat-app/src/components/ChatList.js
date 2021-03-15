import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import { db, auth } from "../firebase/index";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const data = [];

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState();

  useEffect(() => {}, []);

  async function getAnotherUser() {
    const randomValue = 0;
    const newUid = 0;
    const currentUser = auth.currentUser;
    const name = 0,
      uid = 0;
    if (currentUser != null) {
      name = currentUser.displayName;
      uid = currentUser.uid;
    } else {
      console.log("No hay usuario");
    }

    const random = await db
      .ref("/users")
      .once("value")
      .then((snapshot) => getRandomInt(1, snapshot.numChildren()));

    random.then((num) => {
      //setNum(num);
      randomValue = num;
      console.log("dentro", num);
    });

    //console.log("randomvalue", randomValue);

    await db.ref(`userschats/${randomValue}`).once("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("snapvalid", snapshot.val().userid);
        newUid = snapshot.val().userid;
      } else {
        console.log("No data available");
      }
    });
    console.log("newnewuid", newUid);
    console.log("uid", uid);

    console.log("return uid", newUid);
    return newUid;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const hadleAddUserChat = () => {
    const newUid = getAnotherUser();
    console.log("definitiveuid", newUid);
    db.ref(`users/${newUid}`).once("value", (snapshot) => {
      const newUser = {
        email: snapshot.val().email,
        lastname: snapshot.val().lastname,
        name: snapshot.val().name,
        nickname: snapshot.val().nickname,
      };
      setUsers((prevState) => {
        return [...prevState, newUser];
      });
    });
  };

  return (
    <>
      <Tooltip title="Siguiente Usuario">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          danger
          onClick={hadleAddUserChat}
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
              title={<a href="https://ant.design">{item.nickname}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ChatList;
