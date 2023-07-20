import axios from "axios";
import React, { DragEvent, useState, useEffect } from "react";

const S3TestPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlobData] = useState<Blob | null>(null)
  const [query, setQuery] = useState<string>("");
  const [queryTwo, setQueryTwo] = useState<string>("");
  const [profileMedia, setProfileMedia] = useState("")

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFile(selectedFile);
  
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const base64Data = reader.result as string;
          setProfileMedia(base64Data);
          console.log(base64Data);
          const arrayBuffer = event.target.result as ArrayBuffer;
          const blobData = new Blob([arrayBuffer], { type: selectedFile.type });
          setBlobData(blobData);
        }
      };
      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };
      reader.readAsDataURL(selectedFile);
    }
    // setDisabled(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const getImage = async () => {
    await axios
      .get("http://localhost:3000/api/auth/s3image/profile_default.jpg")
      .then((res) => {
        setImageUrl(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = async () => {
    console.log("uploading", blob)
    if (!file || !blob) {
        console.error("error: no file uploaded")
        return
    }
    const formData = new FormData();
    formData.append("content", file, "video-test-1");
    console.log(formData.get("content"))
    await axios
    .post("http://localhost:3000/api/auth/s3video", formData, {
        headers: {
            "content-type": "multipart/form-data",
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
  }

  const updateBio = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios
      .post("http://localhost:3000/api/auth/user/update/password", {password: query, newPass: queryTwo}, {headers})
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="">
      <div
        className="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        drag and drop
      </div>
      {/* <input
          type="text"
          placeholder="Search"
          onChange={(event) => setQuery(event.target.value)}
          className="search-form-input"
        />
      <input
          type="text"
          placeholder="Search"
          onChange={(event) => setQueryTwo(event.target.value)}
          className="search-form-input"
        />
        <button onClick={updateBio}> submit </button> */}
      <button onClick={uploadFile}>upload</button>
      {imageUrl && <img src={imageUrl} />}
    </div>
  );
};

export default S3TestPage;
