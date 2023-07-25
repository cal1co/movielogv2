import './FeedPage.css'
import UserFeed from '../components/UserFeed'
import CreatePostComponent from '../components/CreatePostComponent'
import { useEffect } from 'react';
import { Post } from '../types/PostTypes';
import React, { useState } from 'react';

function FeedPage() {

  useEffect(() => {
    document.title = 'home'
  }, [document.title])

  const [createdPost, setCreatedPost] = useState<Post | null>(null)

  const handleNewPost = (post:any) => {
    setCreatedPost(post)
  }


  return (
    <div className="FeedPage">
      <div className="feed-side">
        <CreatePostComponent onNewPost={handleNewPost}/>
        <UserFeed post={createdPost}/>
      </div>
    </div>
  )
  
}

export default FeedPage
