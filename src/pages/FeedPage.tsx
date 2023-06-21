import './FeedPage.css'
import HomePageSettings from '../components/HomePageSettings'
import SearchBar from '../components/SearchBar'
import UserFeed from '../components/UserFeed'


function FeedPage() {

  return (
    <div className="FeedPage">
      <div className="settings">
      <HomePageSettings/>
      </div>
      <div className="feed">
      <SearchBar></SearchBar>
      <UserFeed/>
      </div>
    </div>
  )
  
}

export default FeedPage
