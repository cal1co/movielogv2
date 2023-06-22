import './UserFeed.css'
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
  const [feed, setFeed] = useState<Post[] | null>(null)

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted) {
      if (!token) {
        console.log("token null. handle this error")
        return
      } 
      getFeed(1)
      establishFeedConnection()
    }
  }, [isMounted])


  const getFeed = (page: number) => {
    axios.get(`http://localhost:8081/v1/feed/${page}`, {headers})
    .then(res => {
      console.log(res.data)
      setFeed(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const establishFeedConnection = () => {
    const socket = new WebSocket(`ws://localhost:8081/connect/` + token);
    socket.onopen = () => {
      console.log('conn open')
    }
    socket.onclose = () => {
      console.log('conn closed')
    }
    socket.onmessage = (event) => {
      console.log('message recieved', event.data)
    }

    return () => {
      socket.close();
    }
  }


  const renderFeed = (feed: Post[]) => {
    return (
      <React.Fragment>
        <div className="posts-container">

          {feed.map((post, idx) => {
            return(
              <PostRender post={post} key={post.post_id}/>
              )
            })}
        </div>
      </React.Fragment>
    );
  }
  return (
    <div className="UserFeed">
      <div className="feedname">
        </div>
      <div className="feed">
      {feed && renderFeed(feed)}
      </div>
    </div>
  )
    
  }
  
  export default UserFeed
  