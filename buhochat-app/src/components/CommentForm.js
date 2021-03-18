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
    }
  }
  const { user } = useAuth();

  const handleWriteComments = async (identifier, array) => {
    const auxArray = [];
    array.forEach((element) => {
      const newComment = {
        nickname: element.author,
        content: element.content.props.children,
        datetime: element.datetime,
      };

      auxArray.push(newComment);
    });
    await db.ref(`comments/${identifier}`).set(auxArray);
  };
  const [updateComments, setUpdateComments] = useState([]);

  useEffect(() => {
    db.ref(`comments/${postIDs[index]}`).on("value", (snapshot) => {
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
        const { value } = state;
        changeAll.comments = [
          ...changeAll.comments,
          {
            author: user.nickname,
            content: <p>{state.value}</p>,
            datetime: moment().format("LLLL"),
          },
        ];
        console.log("STATE VALUE", state.value);
        console.log("PREVSTATE COOMENTS DESPUES ", changeAll.comments);
        handleWriteComments(postIDs[index], changeAll.comments);
        return changeAll;
      });
    }, 1000);
  };
  const handleChange = (event) => {
    setState((prevState) => {
      const changeValue = { ...prevState };
      changeValue.value = event.target.value;
      return changeValue;
    });
  };
  const { comments, submitting, value } = state;
  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        label="hola"
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
