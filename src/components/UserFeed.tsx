// import './UserFeed.css'
import React, { useEffect, useState } from 'react';
import PostRender from '../components/PostRenderComponent';
import { Post } from '../types/PostTypes';
import axios from 'axios';


function UserFeed() {
  const token = localStorage.getItem("token")
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted) {
      if (!token) {
        console.log("token null. handle this error")
        return
      } 
      getFeed(token, 1)
    }
  }, [isMounted])


  const getFeed = (userId:string, page: number) => {
    console.log(userId, page, headers)
    axios.get(`http://localhost:8081/v1/feed/${page}`, {headers})
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="UserFeed">
      User Feed:
      
    </div>
  )
    
  }
  
  export default UserFeed
  