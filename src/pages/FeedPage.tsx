import './FeedPage.css'
import UserFeed from '../components/UserFeed'
import CreatePostComponent from '../components/CreatePostComponent'
import { useEffect } from 'react';

function FeedPage() {

  useEffect(() => {
    document.title = 'home'
  }, [document.title])
  return (
    <div className="FeedPage">
      <div className="feed-side">
        <CreatePostComponent/>
        <UserFeed/>
      </div>
    </div>
  )
  
}

export default FeedPage
