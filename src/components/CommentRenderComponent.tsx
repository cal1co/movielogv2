import { Post, CommentPost } from "../types/PostTypes";
import { useState } from "react";
import "./PostRenderComponent.css";
import axios from "axios";
import CommentModal from "./CommentModal";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Like } from "../../icons/heart-regular.svg";
import { ReactComponent as Unlike } from "../../icons/heart-solid.svg";
import { ReactComponent as Comment} from "../../icons/comment-regular.svg";
import { ReactComponent as Ellipsis } from "../../icons/ellipsis-regular.svg";
import { ReactComponent as Share } from "../../icons/paper-plane-regular.svg";
import { ReactComponent as Save } from "../../icons/bookmark-regular.svg";

type QueryProps = {
  comment: CommentPost;
};
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const PostRender: React.FC<QueryProps> = ({ comment }) => {
  const [postLiked, setPostLiked] = useState<boolean>(comment.liked || false);
  const [postLikes, setPostLikes] = useState<number>(comment.like_count);
  const [postComments, setPostComments] = useState<number>(comment.comments_count);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCommentModal = (): void => {
    setIsCommentModalOpen(true);
  };
  const handleCloseCommentModal = (): void => {
    setIsCommentModalOpen(false);
  };
  const handleComment = async (commentContent: string): Promise<void> => {
    await axios
      .post(
        `http://localhost:8082/post/${comment.comment_id}/comment`,
        {
          comment_content: commentContent,
        },
        { headers }
      )
      .then((res) => {
        setPostComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLike = async (): Promise<void> => {
    await axios
      .post(
        `http://localhost:8082/post/like/${comment.comment_id}`,
        {},
        {
          headers,
        }
      )
      .then((res) => {
        setPostLikes(res.data);
        setPostLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnlike = async () => {
    await axios
      .post(
        `http://localhost:8082/post/unlike/${comment.comment_id}`,
        {},
        {
          headers,
        }
      )
      .then((res) => {
        setPostLikes(res.data);
        setPostLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    const isPostContent = target.classList.contains("post-content");
    const isPostHeader = target.classList.contains("post-header");
    const isPostActions = target.classList.contains("post-actions");
    if (isPostContent || isPostHeader || isPostActions) {
      redirectToPostPage();
    } else {
      // console.log("NOT CONTENT", target.classList)
    }
  };

  function isTextSelected(): boolean {
    const selection = window.getSelection();
    return selection !== null && selection.toString().length > 0;
  }


  const redirectToPostPage = (): void => {
    const alreadyViewing = location.pathname === `/${comment.user_id}/post/${comment.comment_id}`

    if (alreadyViewing) return 
    
    if (!isTextSelected()) {
      navigate(`/${comment.user_id}/post/${comment.comment_id}`, { state: { comment } });
    }
  };
  const handleDate = (date: string): string => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };
  const postAge = (date: string): string => {
    const dateObj = new Date(date);
    const currentDateTime = new Date();
    const timeDiff = currentDateTime.getTime() - dateObj.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours

    if (hoursDiff >= 24) {
      const daysDiff = Math.floor(hoursDiff / 24);
      return `${daysDiff}d`;
    }

    return `${hoursDiff}h`;
  };

  return (
    <div className="post" onClick={handleClick}>
      <div className="post-header">
        <div className="user-profile">
          <img src={comment.profile_image} alt="U" className="profile-image" />
          <div className="name">
            <div className="display-name" onClick={() => navigate(`/${comment.username}`)}>{comment.display_name}</div>
            <div className="username">@{comment.username}</div>
          </div>
        </div>
        <div className="post-info">
          <div className="created-date">{postAge(comment.created_at)}</div>
          <Ellipsis className="ellipsis"/>
          {/* <img
            src={ellipsis}
            alt="three dots ellipsis post settings button"
            className="ellipsis"
          /> */}
        </div>
      </div>
      <div className="content-wrapper">
        <div className="post-content">{comment.comment_content}</div>
        <div className="post-content-shadow" />
      </div>
      <div className="post-actions">
        <div className="action-info">
          <div className="action-count"></div>
          {postLiked ? (
            <div className="like-button post-action-button liked" onClick={handleUnlike}>
              <Unlike/>
            </div>
          ) : (
            <div className="like-button post-action-button unliked" onClick={handleLike}>
              <Like />
            </div>
          )}
          <div className={postLiked ? "count like-count liked-count" : "count like-count unliked-count"}>{postLikes || 0}</div>
          <div className="action-count"></div>
          <div className="comment-button post-action-button" onClick={handleOpenCommentModal}>
            <Comment/>
          </div>
          <div className="count">{postComments || 0}</div>
          <div className="share-button post-action-button">
            <Share/>
          </div>

          <div className="save-button post-action-button">
            <Save />
          </div>
        </div>
      </div>
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={handleCloseCommentModal}
        onSubmit={handleComment}
      />
    </div>
  );
};

export default PostRender;
