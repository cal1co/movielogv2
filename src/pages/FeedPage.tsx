import './FeedPage.css'
import HomePageSettings from '../components/HomePageSettings'
import UserFeed from '../components/UserFeed'
import CreatePostComponent from '../components/CreatePostComponent'

function FeedPage() {

  return (
    <div className="FeedPage">
      <div className="settings">
        <HomePageSettings/>
      </div>
      <div className="feed-side">
        <CreatePostComponent/>
        <UserFeed/>
      </div>
    </div>
  )
  
}

export default FeedPage
