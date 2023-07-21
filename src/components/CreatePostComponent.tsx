import "./CreatePostComponent.css";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ReactComponent as Image } from "../../icons/image-regular.svg";

const createPostComponent = () => {
  const [text, setText] = useState<string>("");
  const [remainingChars, setRemainingChars] = useState<number>(256);
  const [focused, setFocused] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const remaining = 256 - inputValue.length;

    if (remaining >= 0) {
      setText(inputValue);
      setRemainingChars(remaining);
    }
  };
  const handlePost = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post("http://localhost:8082/post", { post_content: text }, { headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="CreatePost">
      <div className="compose-wrapper">
        <div className="write-and-submit-wrapper">
          <textarea
            className="compose-post"
            value={text}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(true)}
            onChange={handleChange}
            placeholder="wazzup?"
          />
          <div className="submit-post" onClick={handlePost}>
            Post
          </div>
        </div>
        {focused && 
        <div className="utils">
          <Image className="post-compose-icon"/>
        <div className="counter">




          {text.length} / 256
        
        </div>
        </div>}
      </div>
    </div>
  );
};

export default createPostComponent;
