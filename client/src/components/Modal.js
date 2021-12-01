import React, { useCallback, useState } from "react";
import "./Modal.scss";

const Modal = ({ isOpen, close, memoID }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    fetch(`/memo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        // fetch 특징
        memoID: memoID + 1,
        title: title,
        content: content,
        author: author,
      }),
    })
      .then((response) => {
        this.props.close();
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = useCallback((event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "author") {
      setAuthor(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  }, []);

  return (
    <React.Fragment>
      {isOpen ? (
        //모달 창이 열려 있다면
        <React.Fragment>
          <div className="Modal-verlay" onClick={close} />
          <div className="Modal">
            <h1 className="title">메모를 기록하세요!</h1>
            <form onSubmit={handleSubmit}>
              <div className="content">
                <h4>
                  <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    name="author"
                    value={author}
                    onChange={handleChange}
                  ></input>
                </h4>
                <br />
                <h4>
                  <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  ></input>
                </h4>
                <textarea
                  name="content"
                  value={content}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="button-wrap">
                <button type="submit">
                  <p>메모 추가하기</p>
                </button>
              </div>
            </form>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Modal;
