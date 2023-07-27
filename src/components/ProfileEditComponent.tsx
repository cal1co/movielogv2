import "./ProfileEditComponent.css";
import React, { ChangeEvent, useEffect, useState, useContext } from "react";
import { AppContext } from '../AppContext';


import axios from "axios";


const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

const ProfileEditComponent = () => {
  
  const [disabled, setDisabled] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [originalUsername, setOriginalUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [originalDisplayName, setOriginalDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [originalBio, setOriginalBio] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [originalProfileImage, setOriginalProfileImage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlobData] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { globalState, setGlobalState } = useContext(AppContext)


  useEffect(() => {
    getUserInfo();
  }, []);

  const handleUsernameChange = (name: string) => {
    setUsername(name);
    setDisabled(false);
  };
  const handleBioChange = (name: string) => {
    setBio(name);
    setDisabled(false);
  };
  const handleDisplayNameChange = (name: string) => {
    setDisplayName(name);
    setDisabled(false);
  };
  const handleSubmit = () => {
    setSuccess(false)
    setError(false)

    if (username !== originalUsername) {
      updateUsername();
    }
    if (bio !== originalBio) {
      updateBio();
    }
    if (displayName !== originalDisplayName) {
      updateDisplayName();
    }
    if (profileImage !== originalProfileImage) {
        updateImageUpload()
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile !== undefined) {
        setFile(selectedFile)

        const reader = new FileReader();
        reader.onload = async (event: ProgressEvent<FileReader>) => {
            if (event.target) {
                const base64Data = reader.result as string;
                setProfileImage(base64Data);
                console.log(base64Data)
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
    setDisabled(false);
  };

  const updateUsername = async () => {
    await axios
      .post(
        "http://localhost:3000/api/auth/user/update/username",
        { username },
        { headers }
      )
      .then((res) => {
        setGlobalState((prevState) => ({
          ...prevState,
          username: username,
        }));
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setError(true);
      });
  };
  const updateBio = async () => {
    await axios
      .post(
        "http://localhost:3000/api/auth/user/update/bio",
        { bioContent: bio },
        { headers }
      )
      .then((res) => {
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setError(true);
      });
  };
  const updateDisplayName = async () => {
    await axios
      .post(
        "http://localhost:3000/api/auth/user/update/displayname",
        { displayName },
        { headers }
      )
      .then((res) => {
        setGlobalState((prevState) => ({
          ...prevState,
          username: displayName,
        }));
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setError(true);
      });
  };
  const updateImageUpload = async () => {
    if (!file || !blob) {
        console.error("error: no file uploaded");
        return;
      }
      const formData = new FormData();
      formData.append("content", file, "profile-image");
      console.log(formData.get("content"));

      await axios
        .post("http://localhost:3000/api/auth/user/s3image/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        })
        .then((res) => {
          setGlobalState((prevState) => ({
            ...prevState,
            username: res.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
  }
  const getUserInfo = async () => {
    setIsLoading(true)
    await axios
      .get("http://localhost:3000/api/auth/userdata", { headers })
      .then((res) => {
        console.log("user data", res.data);
        setUsername(res.data.username);
        setOriginalUsername(res.data.username);
        setBio(res.data.bio);
        setOriginalBio(res.data.bio);
        setDisplayName(res.data.display_name);
        setOriginalDisplayName(res.data.display_name);
        setProfileImage(res.data.profile_image);
        setOriginalProfileImage(res.data.profile_image);
      })
      .catch((err) => {
        console.log(err);
      });
      setIsLoading(false)
  };

  if (isLoading) {
    return <div className="loading-box">
        <div className="loading loading-text"></div>
    </div>
  }

  return (
    <div className="profile-edit-box">
      Edit Profile
      <div className="profile-image-wrapper">
        <img src={profileImage} alt="profile image" className="profile-image-edit" />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="username">
        <label htmlFor="username" data-testid="profile-edit-username">Username:</label>
        <input
          data-testid="profile-edit-user-input"
          type="text"
          id="username"
          value={username}
          onChange={(event) => handleUsernameChange(event.target.value)}
        />
      </div>
      <div className="display-name-wrapper">
        <label htmlFor="displayName">Display Name:</label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(event) => handleDisplayNameChange(event.target.value)}
        />
      </div>
      <div className="bio">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(event) => handleBioChange(event.target.value)}
        />
      </div>
      <div className="submit-and-message">
        <button
          className="profile-edit-submit"
          disabled={disabled}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="feedback-message">
        {error && <p className="error-message">Error updating profile</p>}
        {!error && success && <p className="success-message">Changes saved successfully</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditComponent;
