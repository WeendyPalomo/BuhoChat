import React, { useState } from "react";
import { Row, Col, List, Avatar, Space, Input, Button, Divider } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  WarningOutlined,
  SaveOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import CommentForm from "./CommentForm";

//const listData = [];

// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: "https://ant.design",
//     title: `ant design part ${i}`,
//     avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
//     description:
//       "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//     content:
//       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
//   });
// }

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListOfPosts = ({ posts }) => {
  const [listData, setListData] = useState([]);
  const showPosts = (posts) => {
    const auxList = [];
    posts.forEach((post, index) => {
      auxList.push({
        href: "https://ant.design",
        title: `ant design part ${index}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description: post.title,
        content: post.content,
      });
    });

    setListData(auxList);
  };
  //showPosts(posts);

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={posts}
      // footer={
      //   <div>
      //     <b>ant design</b> footer part
      //   </div>
      // }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[]}
          extra={
            <>
              <Row justify="center">
                <img
                  width={250}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              </Row>
            </>
          }
        >
          <Divider>{item.title}</Divider>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <Row>
                <Col span={10}>{item.userid}</Col>
                <Col span={4} offset={8}>
                  <Row justify="center">
                    <Col span={8}>
                      <Button
                        size="small"
                        type="primary"
                        shape="circle"
                        icon={
                          <Row justify="center">
                            <HeartOutlined />
                          </Row>
                        }
                      ></Button>
                    </Col>
                    <Col span={8}>
                      <Button
                        size="small"
                        type="primary"
                        shape="circle"
                        icon={
                          <Row justify="center">
                            <SaveOutlined />
                          </Row>
                        }
                      ></Button>
                    </Col>
                    <Col span={8}>
                      <Button
                        size="small"
                        type="primary"
                        shape="circle"
                        icon={
                          <Row justify="center">
                            <WarningOutlined />
                          </Row>
                        }
                      ></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
            description={item.content}
          />
          {item.poston}
          <Row justify="center">
            <Col span={16}>
              <CommentForm />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default ListOfPosts;
