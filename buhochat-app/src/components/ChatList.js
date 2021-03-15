import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import { db, auth } from "../firebase/index";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const data = [];

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState();
  const [newUid, setNewUid] = useState();

  useEffect(() => {
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
    }
  }, [newUid]);

  /*function getAnotherUser() {
    
    
    return newUid;
  }*/

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const hadleAddUserChat = () => {
    const random = db
      .ref("/users")
      .once("value")
      .then((snapshot) => getRandomInt(1, snapshot.numChildren()));

    random.then((num) => {
      setNum(num);
      console.log("dentro", num);
    });
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
