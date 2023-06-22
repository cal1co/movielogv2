import './HomePageSettings.css'
import yuzu from '../../icons/lemon-regular.svg'
import home from '../../icons/house-chimney-window-solid.svg'
import search from '../../icons/magnifying-glass-solid.svg'
import notifications from '../../icons/bell-regular.svg'
import bookmark from '../../icons/book-bookmark-solid.svg'
import dms from '../../icons/comment-regular.svg'
import user from '../../icons/user-regular.svg'
import hamburger from '../../icons/bars-solid.svg'


function HomePageSettings() {

    return (
      <div className="HomePageSettings">


        <div className="settings-wrapper">
          <div className="yuzu">
        <img src={yuzu} alt="yuzu icon lemon" className="yuzu-icon icon"/>
          <div className="icon-description yuzu-logo">
            Yuzu
          </div>
          </div>

          <div className="home">
            <img src={home} alt="home icon house" className="home-icon icon"/> 
            <div className="icon-description">
              home 
            </div>
          </div>
          <div className="search">
            <img src={search} alt="search icon magnifying glass" className="search-icon icon"/>
            <div className="icon-description">
              search 
            </div>
          </div>
          <div className="notifications">
            <img src={notifications} alt="notification icon bell" className="notifications-icon icon"/>
            <div className="icon-description">
              notifications 
            </div>
          </div>
          <div className="bookmarks">
            <img src={bookmark} alt="bookmarks icon book" className="bookmarks-icon icon"/>
            <div className="icon-description">
              bookmarks 
            </div>
          </div>
          <div className="direct-messages">
            <img src={dms} alt="direct message message bubbles" className="dms-icon icon"/>
            <div className="icon-description">
              direct messages 
            </div>
          </div>
          <div className="profile">
            <img src={user} alt="user icon person" className="user-icon icon"/>
            <div className="icon-description">
              profile 
            </div>
          </div>

          <div className="more">
            <img src={hamburger} alt="more icon three stacked lines" className="more-icon icon"/>
            <div className="icon-description">
              more
            </div> 
          </div>
        </div>

      </div>
    )
    
  }
  export default HomePageSettings
  