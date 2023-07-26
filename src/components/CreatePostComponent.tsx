import "./CreatePostComponent.css";

import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import axios from "axios";

import { ReactComponent as Image } from "../../icons/image-sharp-regular.svg";
import { ReactComponent as GIF } from "../../icons/gif-regular.svg";
import { ReactComponent as Emoji } from "../../icons/face-smile-regular.svg";
import { ReactComponent as Left } from "../../icons/circle-caret-left-regular.svg";
import { ReactComponent as Right } from "../../icons/circle-caret-right-regular.svg";

import { AppContext } from "../AppContext";

type OnNewPostFunction = (newPost: any) => void;

interface CreatePostProps {
  onNewPost: OnNewPostFunction;
}
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

const createPostComponent = ({ onNewPost }: CreatePostProps) => {
  const [text, setText] = useState<string>("");
  const [remainingChars, setRemainingChars] = useState<number>(256);
  const [focused, setFocused] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [file, setFile] = useState<File[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [blobData, setBlobData] = useState<Blob | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const uploadLimit = 10;

  const { globalState, setGlobalState } = useContext(AppContext);

  useEffect(() => {
    const profile_image = globalState.profile_picture;
    setProfileImage(profile_image);
  }, [globalState.profile_picture]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const remaining = 256 - inputValue.length;

    if (remaining >= 0) {
      setText(inputValue);
      setRemainingChars(remaining);
    }
  };
  const handlePost = async () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    if (imageUploaded) {
      uploadMedia()
    } else {
      await axios
      .post("http://localhost:8082/post", { post_content: text }, { headers })
      .then((res) => {
        onNewPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    setText("");
    setDisabled(false);
  };
  const uploadMedia = async () => {
    console.log("FILES", uploadedFiles)
    const formData = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("content", uploadedFiles[i]);
    }

    formData.append("post_content", JSON.stringify(text))
    await axios
      .post("http://localhost:3000/api/auth/s3image/post/media", formData, { 
        headers:{
        "content-type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
        },
    })
      .then((res) => {
        console.log(res.data)
        onNewPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setImageUploaded(true);
    if (selectedFile !== undefined) {
      uploadedFiles.push(selectedFile)
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const base64Data = reader.result as string;
          uploadedImage.push(base64Data);
          // console.log(base64Data)
          const arrayBuffer = event.target.result as ArrayBuffer;
          const blobData = new Blob([arrayBuffer], { type: selectedFile.type });
          setBlobData(blobData);
        }
      };
      reader.onerror = (error) => {
        console.error("File reading error:", error);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="CreatePost" style={{ opacity: disabled ? "50%" : "100%" }}>
      <div className="compose-wrapper">
        <div className="compose-top-bar">
          <div className="display-image-wrapper">
            <img
              src={globalState.profile_picture}
              alt=""
              className="display-image"
            />
          </div>
          <div className="write-and-submit-wrapper">
            <div className="text-and-post-wrapper">
              <textarea
                className="compose-post"
                value={text}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(true)}
                onChange={handleChange}
                placeholder="wazzup?"
              />
              <div
                className={
                  disabled ? "submit-post disabled-post-button" : "submit-post"
                }
                onClick={disabled ? undefined : handlePost}
              >
                Post
              </div>
            </div>
            <div className="image-upload-wrapper">
              {imageUploaded && (
                <div className="carousel">
                  {carouselIndex > 0 ? (
                    <div className="carousel-control-wrapper"onClick={() => setCarouselIndex(carouselIndex - 1)}>

                    <Left
                      className="carousel-control"
                      
                      />
                      </div>
                  ) : (
                    <div className="carousel-control"></div>
                  )}
                  <img
                    src={uploadedImage[carouselIndex]}
                    alt=""
                    className="media-upload"
                  />
                  {carouselIndex < uploadLimit &&
                  uploadedImage.length > 1 &&
                  carouselIndex < uploadedImage.length - 1 ? (
                    <div className="carousel-control-wrapper" onClick={() => setCarouselIndex(carouselIndex + 1)}>
                      <Right
                        className="carousel-control"
                        
                      />
                    </div>
                  ) : (
                    <div className="carousel-control"></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="utils">
          <div className="compose-icon-wrapper">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*, video/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Image
              className="post-compose-icon"
              onClick={() => fileInputRef.current?.click()}
            />
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
