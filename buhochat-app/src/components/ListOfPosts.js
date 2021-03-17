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
import { onLog } from "firebase";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

let oneByOne = "";
const ListOfPosts = ({ posts, postIDs }) => {
  const [postIdsArray, setPostIdsArray] = useState([postIDs]);
  const [numPage, setNumberPage] = useState(1);
  const listData = [];
  posts.forEach((post) => {
    listData.push({
      title: post.title,
      nickname: post.nickname,
      content: post.content,
      poston: post.poston,
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png",
    });
    //console.log("CADA ID DE pOST", post);
    // setPostIdsArray((prevState) => {
    //   return [...prevState, post.postid];
    // });
  });

  const postIdArrays = posts.map((post) => {
    return post.postid;
  });

  //const postIdArrays = posts.postid;
  //console.log("array de id poist", postIdArrays);

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
          setNumberPage(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}
      // footer={
      //   <div>
      //     <b>ant design</b> footer part
      //   </div>
      // }
      renderItem={(item, index) => (
        <List.Item
          key={item.title}
          actions={[]}
          // extra={
          //   <>
          //     <Row justify="center">
          //       <img
          //         width={250}
          //         alt="logo"
          //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          //       />
          //     </Row>
          //   </>
          // }
        >
          <Divider>{item.title}</Divider>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <Row>
                <Col span={10}>{item.nickname}</Col>
                {/*<Col span={4} offset={8}>*/}
                {/*  <Row justify="center">*/}
                {/*    <Col span={8}>*/}
                {/*      <Button*/}
                {/*        size="small"*/}
                {/*        type="primary"*/}
                {/*        shape="circle"*/}
                {/*        icon={*/}
                {/*          <Row justify="center">*/}
                {/*            <HeartOutlined />*/}
                {/*          </Row>*/}
                {/*        }*/}
                {/*      ></Button>*/}
                {/*    </Col>*/}
                {/*    <Col span={8}>*/}
                {/*      <Button*/}
                {/*        size="small"*/}
                {/*        type="primary"*/}
                {/*        shape="circle"*/}
                {/*        icon={*/}
                {/*          <Row justify="center">*/}
                {/*            <SaveOutlined />*/}
                {/*          </Row>*/}
                {/*        }*/}
                {/*      ></Button>*/}
                {/*    </Col>*/}
                {/*    <Col span={8}>*/}
                {/*      <Button*/}
                {/*        size="small"*/}
                {/*        type="primary"*/}
                {/*        shape="circle"*/}
                {/*        icon={*/}
                {/*          <Row justify="center">*/}
                {/*            <WarningOutlined />*/}
                {/*          </Row>*/}
                {/*        }*/}
                {/*      ></Button>*/}
                {/*    </Col>*/}
                {/*  </Row>*/}
                {/*</Col>*/}
              </Row>
            }
            description={item.content}
          />
          {item.poston}
          <Row justify="center">
            <Col span={16}>
              {/*{setNumber(postIdArrays[])}*/}
              <CommentForm
                postIDs={postIdArrays}
                index={index}
                numPage={numPage}
              />
              {/*{console.log(*/}
              {/*  "DEBERIA SER EL ULTIMO",*/}
              {/*  postIdArrays[postIdArrays.length - 1]*/}
              {/*)}*/}
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default ListOfPosts;
