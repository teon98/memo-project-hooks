import React, { useState, useEffect, useCallback } from "react";
import "./Modal.scss";

const ReModal = ({ reOpen, reclose, data }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thisID, setThisID] = useState(0);

  useEffect(() => {
    const id = data.index + 1;

    setThisID(id);

    //클릭한 메모 불러오는 api
    fetch(`/memo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json:charset=UTF-8",
        Accept: "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((memo) => {
        setTitle(memo.title);
        setContent(memo.content);
        setAuthor(memo.author);
        console.log("Network success - memo : ", memo);
      })
      .catch((error) => console.log("Network Error : ", error));
  }, [data]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const id = thisID;

    fetch(`/memo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        // fetch 특징
        title: title,
        content: content,
        author: author,
      }),
    })
      .then((response) => {
        reclose();
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

  const handleRemove = () => {
    const id = thisID;

    fetch(`/memo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        // fetch 특징
        title: title,
        content: content,
        author: author,
      }),
    })
      .then((response) => {
        reclose();
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {reOpen && (
        //모달 창이 열려 있다면
        <React.Fragment>
          <div className="Modal-verlay" onClick={reclose} />
          <div className="Modal">
            <h1 className="title">메모를 수정하세요!</h1>
            <form onSubmit={handleUpdate}>
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
                  <p>수정하기</p>
                </button>
                <button type="button" onClick={handleRemove}>
                  <p>삭제하기</p>
                </button>
              </div>
            </form>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ReModal;
