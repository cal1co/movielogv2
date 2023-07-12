import './UserPage.css'
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostRender from '../components/PostRenderComponent'
import { Post } from '../types/PostTypes'


type User = {
  id: number,
  username: string
  display_name: string
  profile_image:string
  follow_data:
    {
      follower_count: number,
      following_count: number
    }
}

const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

function UserPage() {

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const { username } = useParams();

  useEffect(() => {
      if (username) {
        getUser(username)
      }
  }, [username])

  const getUser = async (username:string) => {
    await axios.get(`http://localhost:3000/api/auth/user/${username}`, { headers })
    .then(res => {
      const tempUser: User = res.data.user
      tempUser.username = username
      
      setUser(tempUser)
      setPosts(res.data.posts)
      setIsUser(res.data.same_user)
      setIsFollowing(res.data.following)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const follow = async(uid: number) => {
    await axios.post(`http://localhost:3000/api/auth/follow/${uid}`, {},{headers})
    .then(res => {
      console.log(res.data)
      setIsFollowing(true)
      if (user) {
        user.follow_data.follower_count += 1
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  const unfollow = async(uid: number) => {
    await axios.post(`http://localhost:3000/api/auth/unfollow/${uid}`, {}, {headers})
    .then(res => {
      console.log(res.data)
      setIsFollowing(false)
      if (user) {
        user.follow_data.follower_count -= 1
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  

  const renderPosts = (posts: Post[]) => {
    return (
      <React.Fragment>
        {posts.map((post, idx) => {
          if (user) {
            post.profile_image = user.profile_image
            post.display_name = user.display_name
            post.username = user.username
          }
        return(
          <PostRender post={post} key={post.post_id}/>
        )
        })}
      </React.Fragment>
    );
  }
  return (
    <div className="UserPage">
      <div className="profile">
        {
        user 

        && 

        <div className="user-display">
          <div className="username">
            {user.username}'s profile
          </div>
          <div className="profile-img">
            <img src={user.profile_image} alt="" className="profile-img"/>
          </div>
          <div className="follow-data">
            {user.follow_data.follower_count} followers
            {user.follow_data.following_count} following
          </div>

          <div className="utils">
            {
              isUser
              ?
              <div className="user-settings">
                settings
              </div>
              :
              <div className="follow-button">
                {isFollowing ? 
                  <div className="" onClick={() => unfollow(user.id)}>
                    unfollow
                  </div>
                  :
                  <div className="" onClick={() => follow(user.id)}>
                    follow
                  </div>
                }
              </div>
            }
          </div>


        </div>
        
        
        
        }
      </div>

      <div className="posts">
        {posts && renderPosts(posts)}
      </div>
    </div>
  )
}

export default UserPage
