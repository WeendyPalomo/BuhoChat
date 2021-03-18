import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Avatar,
  Space,
  
  Button,
  Divider,
  
} from "antd";
import {
  
  WarningOutlined,
  SaveOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import CommentForm from "./CommentForm";
import { db } from "../firebase";
<<<<<<< HEAD

=======
>>>>>>> 61c563a43798d1e956135304d058128de20ff1e3
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
<<<<<<< HEAD
  const [likedPosts, setLikedPosts] = useState([]);
  const [likes, setLikes] = useState([]);
=======
  const [like, setLike] = useState(0);
>>>>>>> d0cbeeceaf9df4517d90072b297a4f2fe967b535
  const listData = [];
  posts.forEach((post) => {
    listData.push({
      title: post.title,
      nickname: post.nickname,
      content: post.content,
      poston: post.poston,
      postid: post.postid,
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png",
    });
  });

  const postIdArrays = posts.map((post) => {
    return post.postid;
  });

  const handleSavedPost = async (girft) => {
    for (let i = 1; i <= numPage; i++) {
      if (numPage === i) {
        girft += (numPage - 1) * 4;
      }
    }
    setSavedPosts((prevState) => {
      if (!savedPosts.includes(posts[girft].postid)) {
        return [...prevState, posts[girft].postid];
      } else {
        return [...prevState];
      }
    });
  };


  useEffect(() => {
    db.ref(`savedposts/${user.uid}`).set(savedPosts);

    return () => {
      db.ref("savedposts").off();
    };
  }, [savedPosts]);

<<<<<<< HEAD
  const handleLikedPost = async (indexLike) => {
    for (let i = 1; i <= numPage; i++) {
      if (numPage === i) {
        indexLike += (numPage - 1) * 4;
      }
    }
    setLikedPosts((prevState) => {
      if (!likedPosts.includes(posts[indexLike].postid)) {
        return [...prevState, posts[indexLike].postid];
      } else {
        return [...prevState];
      }
    });

    await db
      .ref(`poststatistics/${posts[indexLike].postid}/likes`)
      .set(likedPosts.length);
  };

  useEffect(() => {
    db.ref(`likedposts/${user.uid}`).set(likedPosts);
    return () => {
      db.ref("likedposts").off();
    };
  }, [likedPosts]);
=======

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

  
>>>>>>> d0cbeeceaf9df4517d90072b297a4f2fe967b535

  const stylesCount = {
    position: "relative",
    right: 15,
  };

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
      renderItem={(item, index) => (
        <List.Item key={item.title} actions={[]}>
          <Divider>{item.title}</Divider>

          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <Row>
                <Col span={10}>{item.nickname}</Col>
                <Col span={4} offset={8}>
                  <Row justify="center">
                    <Col span={3} justify="center">
                      <div style={stylesCount}>{likedPosts.length}</div>
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
<<<<<<< HEAD
                        onClick={async () => {
                          await handleLikedPost(index);
                        }}
=======
                      
                        
>>>>>>> d0cbeeceaf9df4517d90072b297a4f2fe967b535
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
              <CommentForm
                postIDs={postIdArrays}
                index={index}
                numPage={numPage}
              />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default ListOfPosts;
