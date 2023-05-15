// import './UserPage.css'
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  id: number,
  username: string
}

type Post = {
  post_id: string,
  user_id: number,
  post_content: string,
  created_at: string,
  like_count: number,
  comment_count: number
}

const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*'
};

function UserPage() {

  const location = useLocation()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted) {
      const username: string = location.pathname.substring(1);
      getUser(username)
    }
  }, [isMounted])

  useEffect(() => {
    if (isMounted && user) {
      getUserPosts(user.id)
    }
  }, [user])

  const getUser = async (username:string) => {
    await axios.get(`http://localhost:3000/api/auth/getuser/${username}`)
    .then(res => {
      const tempUser: User = {
        id: parseInt(res.data.id),
        username:res.data.username
      }
      setUser(tempUser)

      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const getUserPosts = async (uid: number) => {
    await axios.get(`http://localhost:8080/feed/user/${uid}`, {
      headers
    })
    .then(res => {
      setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const renderPosts = (posts: Post[]) => {
    return (
      <React.Fragment>
        {posts.map((post, idx) => {
        return(
          <div className="post-wrapper">
            <br></br>
            post:
          <div className="">{post.post_content}</div>
          <div className="">likes: {post.like_count || 0}</div>
          <div className="">comments: {post.comment_count || 0}</div>
          <div className="">{post.created_at}</div>
          </div>
        )
        })}
      </React.Fragment>
    );
  }
  return (
    <div className="UserPage">
      {user && <div>{user.username}'s profile</div>}

      <div className="posts">
        {posts && renderPosts(posts)}
      </div>
    </div>
  )
}

export default UserPage
