import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileEditComponent.css'

const token = localStorage.getItem("token");
const headers = {
    Authorization: `Bearer ${token}`,
};

const ProfileEditComponent = () => {

    const [disabled, setDisabled] = useState<boolean>(true)
    const [username, setUsername] = useState<string>('')
    const [originalUsername, setOriginalUsername] = useState<string>('')
    const [displayName, setDisplayName] = useState<string>('')
    const [originalDisplayName, setOriginalDisplayName] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [originalBio, setOriginalBio] = useState<string>('')
    const [profileImage, setProfileImage] = useState<string>('')
    const [originalProfileImage, setOriginalProfileImage] = useState<string>('')

    useEffect(() => {
        getUserInfo()
    }, [])

    const handleUsernameChange = (name:string) => {
        setUsername(name)
        setDisabled(false)
    }
    const handleBioChange = (name:string) => {
        setBio(name)
        setDisabled(false)
    }
    const handleDisplayNameChange = (name:string) => {
        setDisplayName(name)
        setDisabled(false)
    }
    const handleSubmit = () => {
        if (username !== originalUsername) {
            updateUsername()
        }
        if (bio !== originalBio) {
            updateBio()
        }
        if (displayName !== originalDisplayName) {
            updateDisplayName()
        }
    }

    const updateUsername = async () => {
        await axios.post('http://localhost:3000/api/auth/user/update/username', { username }, { headers })
        .then(res => {
            console.log("username", res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const updateBio = async () => {
        await axios.post('http://localhost:3000/api/auth/user/update/bio', { bioContent: bio }, { headers })
        .then(res => {
            console.log("bio", res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const updateDisplayName = async () => {
        await axios.post('http://localhost:3000/api/auth/user/update/displayname', { displayName }, { headers })
        .then(res => {
            console.log("display", res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getUserInfo = async () => {
        await axios.get('http://localhost:3000/api/auth/userdata', { headers })
        .then( res => {
            console.log(res.data)
            setUsername(res.data.username)
            setOriginalUsername(res.data.username)
            setBio(res.data.bio)
            setOriginalBio(res.data.bio)
            setDisplayName(res.data.display_name)
            setOriginalDisplayName(res.data.display_name)
            setProfileImage(res.data.profile_image)
            setOriginalProfileImage(res.data.profile_image)
        })
        .catch( err => {
            console.log(err)
        })
    }
    return (
        <div className="profile-edit-box">
            Edit Profile

            <div className="profile-image-wrapper">
                <img src={profileImage} alt="profile image" className="profile-image"/>
            </div>
            <div className="username">
                <input type="text" value={username} onChange={(event) => handleUsernameChange(event.target.value)}/>
            </div>
            <div className="display-name">
                <input type="text" value={displayName} onChange={(event) => handleDisplayNameChange(event.target.value)}/>
            </div>
            <div className="bio">
                <input type="text" value={bio} className="bio-input" onChange={(event) => handleBioChange(event.target.value)}/>
            </div>
            <button className="profile-edit-submid" disabled={disabled} onClick={handleSubmit}>Submit </button>
        </div>
    )
};

export default ProfileEditComponent;