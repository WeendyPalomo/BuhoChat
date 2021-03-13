import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import { db } from "../firebase/index";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const data = [];
const ChatList = () => {
  useEffect(() => {
    const usersRef = db.ref("users/");
    usersRef.on("value", (snapshot) => {
      const users = snapshot.val();
      console.log("users", users);
      console.log("usersCount", snapshot.numChildren());
    });
  }, []);

  const [users, setUsers] = useState([]);
  const [num, setNum] = useState();

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const hadleAddUserChat = () => {
    console.log("fuera", num);
    const random = db
      .ref("/users")
      .once("value")
      .then((snapshot) => Math.floor(Math.random() * snapshot.numChildren()));
    random.then((num) => {
      setNum(num);
      console.log("dentro", num);
    });

    const newUser = db
      .ref("/users")
      .orderByKey()
      .limitToFirst(num)
      .once("value")
      .then((users) => {
        // Object.keys(users)[num];
        console.log(users);
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
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ChatList;
