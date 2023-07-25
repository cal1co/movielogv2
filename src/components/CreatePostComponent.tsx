import "./CreatePostComponent.css";

import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { ReactComponent as Image } from "../../icons/image-sharp-regular.svg";
import { ReactComponent as GIF } from "../../icons/gif-regular.svg";
import { ReactComponent as Emoji } from "../../icons/face-smile-regular.svg";
import { AppContext } from '../AppContext';

type OnNewPostFunction = (newPost: any) => void;

interface CreatePostProps {
  onNewPost: OnNewPostFunction;
}


const createPostComponent = ( {onNewPost}:CreatePostProps ) => {

  const [text, setText] = useState<string>("");
  const [remainingChars, setRemainingChars] = useState<number>(256);
  const [focused, setFocused] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>("");

  const { globalState, setGlobalState } = useContext(AppContext);

  useEffect(() => {
    const profile_image = globalState.profile_picture
    setProfileImage(profile_image)
  }, [globalState.profile_picture])

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
        onNewPost(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="CreatePost">
      <div className="compose-wrapper">
        <div className="compose-top-bar">
        <div className="display-image-wrapper">

        <img src={globalState.profile_picture} alt="" className="display-image"/>
        </div>
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
        </div>
        <div className="utils">
          <div className="compose-icon-wrapper">
            <Image className="post-compose-icon" />
            <GIF className="post-compose-icon" />
            <Emoji className="post-compose-icon" />
          </div>
          {focused && <div className="counter">{text.length} / 256</div>}
        </div>
      </div>
    </div>
  );
};

export default createPostComponent;
