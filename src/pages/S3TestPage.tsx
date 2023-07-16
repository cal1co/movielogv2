import axios from "axios";
import React, { DragEvent, useState, useEffect } from "react";

const S3TestPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlobData] = useState<Blob | null>(null)
  const [query, setQuery] = useState<string>("");
  const [queryTwo, setQueryTwo] = useState<string>("");

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);

    const reader = new FileReader();
    reader.onload = async (event:ProgressEvent<FileReader>) => {
        if (event.target) {
            
            if (event.target.result !== null) {
                const arrayBuffer = event.target.result;
                const blobData = new Blob([arrayBuffer], { type: droppedFile.type });
                setBlobData(blobData)
            }
        }
        const base64Data = event.target?.result?.toString()?.split(',')[1];
        setImageUrl("data:image/jpeg;base64," + base64Data)
    }
    reader.readAsDataURL(droppedFile);
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
    formData.append("content", file, "28");
    console.log(formData.get("content"))
    await axios
    .post("http://localhost:3000/api/auth/user/s3image/upload", formData, {
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
