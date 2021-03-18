import React, { useState, useEffect } from "react";
import { Button, Comment, List, Form, Input } from "antd";
import moment from "moment";
import { db } from "../firebase";
import { useAuth } from "../lib/auth";
const { Item } = Form;
const { TextArea } = Input;


const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "comentarios" : "comentario"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Item>
      <TextArea rows={1} onChange={onChange} value={value} />
    </Item>
    <Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        size="small"
      >
        Añadir comentario
      </Button>
    </Item>
  </>
);

const CommentForm = ({ postIDs, index, numPage }) => {
  for (let i = 1; i <= numPage; i++) {
    if (numPage === i) {
      index += (numPage - 1) * 4;
      //setUtilIndex(index)
    }
  }

  // for (let i = numPage; i >= 1; i--) {
  //   if (numPage === i) {
  //     index -= (numPage - 1) * 4;
  //   }
  // }

  const { user } = useAuth();
  const [commentDatetime, setCommentDatetime] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentArray, setCommentArray] = useState("");

  // const handleWriteComments = async (postIdentifier, comments) => {
  //   // if (!!postIdentifier) {
  //   //   await db.ref(`comments/${postIdentifier}`).set(comments);
  //   // } else {
  //   //   console.log("NO VALIO");
  //   // }
  // };

  const handleWriteComments = async (identifier, array) => {
    //console.log("POST", identifier.title);
    const auxArray = [];
    array.forEach((element) => {
      const newComment = {
        nickname: element.author,
        content: element.content.props.children,
        datetime: element.datetime,
      };

      auxArray.push(newComment);
      // console.log("se imprime autor", element.author);
      // console.log("se imprime contenido", element.content.props.children);
      // console.log("se imprime datetime", element.datetime);
    });
    // console.log("SE IMPRIME AUTOR", array[2].author);
    // console.log("SE IMPRIME CONTENIDO", array[2].content.props.children);
    // console.log("SE IMPRIME DATETIME", array[2].datetime);
    // await array.forEach((comment)=>{
    await db.ref(`comments/${identifier}`).set(
      auxArray
      //     { price: 205, stock: "agotado" },
      //     { price: 205, stock: "NUEVO" },
    );
    // })
  };
  const [updateComments, setUpdateComments] = useState([]);

  useEffect(() => {
    db.ref(`comments/${postIDs[index]}`).on("value", (snapshot) => {
      console.log(
        `SNAPSHOT DE POST CON INDEX ${postIDs[index]}`,
        snapshot.val()
      );

      setUpdateComments(snapshot.val());
    });

    return () => {
      db.ref("comments").off();
    };
  }, []);

  const firstState = {
    comments: updateComments,
    submitting: false,
    value: "",
  };
  const [state, setState] = useState(firstState);
  const handleSubmit = async () => {
    if (!state.value) {
      return;
    }
    setState((prevState) => {
      const changeSubmitting = { ...prevState };
      changeSubmitting.submitting = true;
      return changeSubmitting;
    });
    setTimeout(() => {
      setState((prevState) => {
        const changeAll = { ...prevState };
        changeAll.submitting = false;
        changeAll.value = "";
        console.log("PREVSTATE COMMENTS ANTES", prevState.comments);
        //prevState.comments;
        const { value } = state;
        changeAll.comments = [
          ...changeAll.comments,
          {
            author: user.nickname,
            //avatar:
            //"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{state.value}</p>,
            datetime: moment().format("LLLL"),
          },
        ];
        console.log("STATE VALUE", state.value);
        console.log("PREVSTATE COOMENTS DESPUES ", changeAll.comments);
        //setCommentArray(changeAll.comments);
        handleWriteComments(postIDs[index], changeAll.comments);
        //console.log("EL ID DE ESTE ES ", ID);
        return changeAll;
      });
    }, 1000);

    //await handleWriteComments(postID, commentArray);
  };
  const handleChange = (event) => {
    setState((prevState) => {
      const changeValue = { ...prevState };
      changeValue.value = event.target.value;
      return changeValue;
    });
    //console.log("haber yqe sale!", postIDs[postIDs.length - 1]);
    console.log("INDEX DE ESTE POST", index);
    //console.log("QUE ES ESTA HUEVADA", postIDs);
    console.log("ESTE POST TIENE ID ", postIDs[index]);
    //console.log("numpage", numPage);
  };
  const { comments, submitting, value } = state;
  console.log("COMENTS", comments);
  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        label="hola"
        // avatar={
        //   <Avatar
        //     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        //     alt="alexis"
        //   />
        // }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};
export default CommentForm;
