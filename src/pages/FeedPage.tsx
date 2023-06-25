import './FeedPage.css'
import HomePageSettings from '../components/HomePageSettings'
import UserFeed from '../components/UserFeed'


function FeedPage() {

  return (
    <div className="FeedPage">
      <div className="settings">
        <HomePageSettings/>
      </div>
      <div className="feed">
        <UserFeed/>
      </div>
    </div>
  )
  
}

export default FeedPage
