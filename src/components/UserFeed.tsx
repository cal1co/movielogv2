import './UserFeed.css'
import React, { useEffect, useState, useContext } from 'react';
import PostRender from '../components/PostRenderComponent';
import { Post } from '../types/PostTypes';
import axios from 'axios';
import { AppContext } from '../AppContext';

type ProfileImageFetch = {
  user_id: number
  profile_image: string
  profile_image_data: string
}

interface PostInterface {
  post: Post | null
}
function UserFeed({post}:PostInterface ) {
  const token = localStorage.getItem("token")
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [feed, setFeed] = useState<Post[] | null>(null)
  const [feedImages, setFeedImages] = useState<string | null>(null)

  const { globalState } = useContext(AppContext)

  useEffect(() => {
    setIsMounted(true);
  }, [])


  useEffect(() => {
    if (post && feed) {

      post.username = globalState.username
      post.display_name = globalState.display_name
      setFeed((prevFeed) => [post, ...(prevFeed as Post[])])
    }
  }, [post])

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
      getProfileImages(res.data)
      setFeed(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const getProfileImages = (users:Post[]) => {
    const usersMap: {[key:number]: string} = {}
    const fetchReq:ProfileImageFetch[] = []
    for (let i = 0; i < users.length; i++) {
      if (!usersMap[users[i].user_id]) {
        const user_data:ProfileImageFetch ={
          user_id: users[i].user_id,
          profile_image_data: users[i].profile_image_data,
          profile_image: ""
        }
        fetchReq.push(user_data)
      }
    }
    axios.post(`http://localhost:3000/api/auth/s3image/feed/`, {fetchReq})
    .then(res => {
      setFeedImages(res.data)
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
            if (feedImages && feedImages[post.user_id]){
              post.profile_image = feedImages[post.user_id]
            }
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
      {/* <div className="feedname">
        </div> */}
      <div className="feed">
      {feed && renderFeed(feed)}
      </div>
    </div>
  )
    
  }
  
  export default UserFeed
  