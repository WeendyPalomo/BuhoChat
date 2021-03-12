import React, { useEffect } from "react";
import { List, Avatar } from "antd";
import { db } from "../firebase/index";

const data = [];
const ChatList = () => {
  useEffect(() => {
    const usersList = async () => {
      await db.ref("/users");
    };
    console.log("users", usersList);
  }, []);
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
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
  );
};

export default ChatList;
