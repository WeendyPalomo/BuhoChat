import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Avatar,
  Space,
  Input,
  Button,
  Divider,
  message,
} from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  WarningOutlined,
  SaveOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import CommentForm from "./CommentForm";
import { db } from "../firebase";
import { onLog } from "firebase";
import { useAuth } from "../lib/auth";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

let oneByOne = "";
const ListOfPosts = ({ posts, postIDs }) => {
  const { user } = useAuth();
  const [postIdsArray, setPostIdsArray] = useState([postIDs]);
  const [numPage, setNumberPage] = useState(1);
  const [auxIndex, setAuxIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [savedPosts, setSavedPosts] = useState([]);
  const [like, setLike] = useState(0);
  const listData = [];
  //posts.reverse();
  posts.forEach((post) => {
    listData.push({
      title: post.title,
      nickname: post.nickname,
      content: post.content,
      poston: post.poston,
      postid:post.postid,
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

  const handleSavedPost = async (girft) => {
    //const savedPost = [];
    for (let i = 1; i <= numPage; i++) {
      if (numPage === i) {
        girft += (numPage - 1) * 4;
        //setUtilIndex(index)
      }
    }
    console.log(`imprime el id ${girft} con POSTID`, posts[girft].postid);
    console.log("NUMBEROAGE", numPage);
    //savedPost.push(posts[girft].postid);
    setSavedPosts((prevState) => {
      return [...prevState, posts[girft].postid];
    });
  };

  useEffect(() => {
    db.ref(`savedposts/${user.uid}`).set(savedPosts);
    //message.success("Guardado!");

    return () => {
      db.ref("savedposts").off();
    };
  }, [savedPosts]);


  const handleLikepost = async (likepost) => {
    
    for (let i = 1; i <= numPage; i++) {
      if (numPage === i) {
        likepost += (numPage - 1) * 4;
        
      }
    }
    console.log(`imprime el id ${likepost} con POSTID`, posts[likepost].postid);
    console.log("NUMBEROAGE", numPage);
    
    setLike((prevState) => {
      return [...prevState, posts[likepost].postid];
    });
  };

  useEffect(() => {
    db.ref(`likedposts/${user.uid}`).set(like);
    
  }, [like]);

  

  

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
          setNumberPage(page);
        },
        pageSize: 4,
      }}
      dataSource={listData}
      // footer={
      //   <div>
      //     <b>ant design</b> footer part
      //   </div>
      // }

      renderItem={(item, index) => (
        //setItemIndex(index),
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
                <Col span={4} offset={8}>
                  <Row justify="center">
                    <Col span={3} justify="center">
                      1
                    </Col>
                    <Col span={7}>
                    
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
                    <Col span={7}>
                      <Button
                        size="small"
                        type="primary"
                        shape="circle"
                        icon={
                          <Row justify="center">
                            <SaveOutlined />
                          </Row>
                        }
                        onClick={() => handleSavedPost(index)}
                      ></Button>
                    </Col>
                    <Col span={7}>
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
              {/*{setNumber(postIdArrays[])}*/}
              <CommentForm
                postIDs={postIdArrays}
                index={index}
                numPage={numPage}
              />

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
