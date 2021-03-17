import React, { useState } from "react";
import { Avatar, Button, Comment, List, Form, Input } from "antd";
import moment from "moment";
const { Item } = Form;
const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
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
const CommentForm = () => {
  const firstState = {
    comments: [],
    submitting: false,
    value: "",
  };
  const [state, setState] = useState(firstState);
  const handleSubmit = () => {
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
        changeAll.comments = [
          ...changeAll.comments,
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
        ];
        const auxData = changeAll.comments;
        //data = auxData;
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
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
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
