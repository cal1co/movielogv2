import "./UserPage.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState  } from "react";
import axios from "axios";
import PostRender from "../components/PostRenderComponent";
import { Post } from "../types/PostTypes";
import { UserData } from "../types/UserTypes";
import { ReactComponent as Gear } from "../../icons/gear-regular.svg";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

function UserPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      getUser(username);
      document.title = "@" + username;
    }
  }, [username]);

  const getUser = async (username: string) => {
    await axios
      .get(`http://localhost:3000/api/auth/user/${username}`, { headers })
      .then((res) => {
        const tempUser: UserData = res.data.user;
        tempUser.username = username;
        console.log("USER", res.data.user);
        setUser(tempUser);
        setPosts(res.data.posts);
        setIsUser(res.data.same_user);
        setIsFollowing(res.data.following);
        document.title = res.data.user.display_name + ` (@${username})`;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const follow = async (uid: number) => {
    await axios
      .post(`http://localhost:3000/api/auth/follow/${uid}`, {}, { headers })
      .then((res) => {
        addPostsToFeed(uid);
        setIsFollowing(true);
        if (user) {
          user.follow_data.follower_count = Number(
            user.follow_data.follower_count
          );
          user.follow_data.follower_count += 1;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unfollow = async (uid: number) => {
    await axios
      .post(`http://localhost:3000/api/auth/unfollow/${uid}`, {}, { headers })
      .then((res) => {
        removePostsFromFeed(uid);
        setIsFollowing(false);
        if (user) {
          user.follow_data.follower_count = Number(
            user.follow_data.follower_count
          );
          user.follow_data.follower_count -= 1;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addPostsToFeed = async (uid: number) => {
    await axios
      .get(`http://localhost:8081/v1/feed/post/user/follow/${uid}`, { headers })
      .then((res) => {
        console.log("post feed add", res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const removePostsFromFeed = async (uid: number) => {
    await axios
      .get(`http://localhost:8081/v1/feed/post/user/unfollow/${uid}`, {
        headers,
      })
      .then((res) => {
        console.log("post feed remove", res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const renderPosts = (posts: Post[]) => {
    return (
      <React.Fragment>
        {posts.map((post, idx) => {
          if (user) {
            post.profile_image = user.profile_image;
            post.display_name = user.display_name;
            post.username = user.username;
          }
          return <PostRender post={post} key={post.post_id} />;
        })}
      </React.Fragment>
    );
  };
  return (
    <div className="UserPage">
      <div className="profile">
        {user && (
          <div className="user-display">
            <div className="profile-page-wrapper">
              <div className="profile-img">
                <img src={user.profile_image} alt="" className="profile-img" />
              </div>
              <div className="data-panel">
                <div className="misc-actions">
                  <div className="head-username">{user.username}</div>
                  <div className="user-utils">
                    {isUser ? (
                      <Gear className="user-settings-button" onClick={() => navigate('/accounts/settings')}/>
                    ) : (
                      <div className="follow-button">
                        {isFollowing ? (
                          <div
                            className="unfollow-user"
                            onClick={() => unfollow(user.id)}
                          >
                            unfollow
                          </div>
                        ) : (
                          <div
                            className="follow-user"
                            onClick={() => follow(user.id)}
                          >
                            follow
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="follow-data">
                  <div className="follower-count">
                    {user.follow_data.follower_count} followers
                  </div>
                  <div className="following-count">
                    {user.follow_data.following_count} following
                  </div>
                </div>
                <div className="user-more-info">
                  <div className="user-more-info-display-name">
                    {user.display_name}
                  </div>
                  <div className="user-more-info-bio">{user.bio}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="posts">{posts && renderPosts(posts)}</div>
    </div>
  );
}

export default UserPage;
