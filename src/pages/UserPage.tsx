// import './UserPage.css'
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostRender from '../components/PostRenderComponent'
import { Post } from '../types/PostTypes'


type User = {
  id: number,
  username: string
}

const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
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
    await axios.get(`http://localhost:3000/api/auth/getuser/${username}`, {headers})
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
      console.log(res.data)
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
          <PostRender post={post} key={post.post_id}/>
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
