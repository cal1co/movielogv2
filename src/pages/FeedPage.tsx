// import './FeedPage.css'
import HomePageSettings from '../components/HomePageSettings'
import SearchBar from '../components/SearchBar'
import UserFeed from '../components/UserFeed'


function FeedPage() {

  return (
    <div className="FeedPage">
      <SearchBar></SearchBar>
      THIS IS FeedPage
      <HomePageSettings></HomePageSettings>
      <UserFeed></UserFeed>
    </div>
  )
  
}

export default FeedPage
