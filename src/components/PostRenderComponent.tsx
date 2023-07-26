import { Post, CombinedPostType } from "../types/PostTypes";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./PostRenderComponent.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Like } from "../../icons/heart-regular.svg";
import { ReactComponent as Unlike } from "../../icons/heart-solid.svg";
import { ReactComponent as Comment } from "../../icons/comment-regular.svg";
import { ReactComponent as Ellipsis } from "../../icons/ellipsis-regular.svg";
import { ReactComponent as Share } from "../../icons/paper-plane-regular.svg";
import { ReactComponent as Save } from "../../icons/bookmark-regular.svg";
import { ReactComponent as Left } from "../../icons/circle-caret-left-regular.svg";
import { ReactComponent as Right } from "../../icons/circle-caret-right-regular.svg";


import React, { useContext } from "react";
import { CommentModalContext } from "../CommentModalContext";
import postAgeHandler from "../utils/postAgeHandler";

type QueryProps = {
  post: Post;
};
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const PostRender: React.FC<QueryProps> = ({ post }) => {
  const child1Ref = useRef<HTMLDivElement>(null);
  const child2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const postContent = useRef<HTMLImageElement>(null);


  const [parentHeight, setParentHeight] = useState(0);

  const [postLiked, setPostLiked] = useState<boolean>(post.liked || false);
  const [postLikes, setPostLikes] = useState<number>(post.like_count);
  const [postComments, setPostComments] = useState<number>(post.comments_count);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [postMediaLoaded, setPostMediaLoaded] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [postHeight, setPostHeight] = useState<number>(0);
  const [postTextHeight, setPostTextHeight] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { openModal, parentPost, updatePost } = useContext(CommentModalContext);

  useLayoutEffect(() => {
    const child1Height = child1Ref.current ? child1Ref.current.getBoundingClientRect().height
      : 0;
  
    const overlapHeight = 10;
    let contentRefHeight = contentRef.current ? contentRef.current.getBoundingClientRect().height : 0
    setContentHeight(contentRefHeight)
    const currPostHeight = postContent.current ? postContent.current.getBoundingClientRect().height : 0
    setPostHeight(currPostHeight)
    if (child2Ref.current) {
      child2Ref.current.style.height = `${child1Height - 20 - 4}px`;
    }

    const newParentHeight = child1Height + overlapHeight;
    setParentHeight(newParentHeight);
  }, [uploadedImages, carouselIndex]);

  useEffect(() => {
    if (post.media) {
      fetchMedia();
    }
  }, []);

  const handleOpenCommentModal = (): void => {
    const combinedPost: CombinedPostType = {
      id: post.post_id,
      content: post.post_content,
      user_id: post.user_id,
      parent_post_id: "",
      created_at: post.created_at,
      like_count: post.like_count,
      comments_count: post.comments_count,
      liked: post.liked,
      username: post.username,
      display_name: post.display_name,
      profile_image: post.profile_image,
      profile_image_data: post.profile_image_data,
      is_comment: false,
    };
    openModal(combinedPost.id);
    updatePost(combinedPost);
  };
  const handleCloseCommentModal = (): void => {
    setIsCommentModalOpen(false);
  };
  const handleComment = async (comment: string): Promise<void> => {
    await axios
      .post(
        `http://localhost:8082/post/${post.post_id}/comment`,
        {
          comment_content: comment,
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
        `http://localhost:8082/post/like/${post.post_id}`,
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
        `http://localhost:8082/post/unlike/${post.post_id}`,
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
    const alreadyViewing =
      location.pathname === `/${post.user_id}/post/${post.post_id}`;

    if (alreadyViewing) return;

    if (!isTextSelected()) {
      navigate(`/${post.user_id}/post/${post.post_id}`, { state: { post } });
    }
  };
  const handleDate = (date: string): string => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  const fetchMedia = async () => {
    axios
      .post(`http://localhost:3000/api/auth/s3image/post/images`, {
        media: post.media,
      })
      .then((res) => {
        setUploadedImages(res.data);
        setPostMediaLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="post" onClick={handleClick}>
      <div className="post-header">
        <div className="user-profile">
          <img src={post.profile_image} alt="U" className="profile-image" />
          <div className="name">
            <div
              className="display-name"
              onClick={() => navigate(`/${post.username}`)}
            >
              {post.display_name}
            </div>
            <div className="username">@{post.username}</div>
          </div>
        </div>
        <div className="post-info">
          <div className="created-date">{postAgeHandler(post.created_at)}</div>
          <Ellipsis className="ellipsis" />
        </div>
      </div>
      <div className="content-wrapper" style={{ height: `${parentHeight}px` }}>
        <div className="post-content-wrapper" ref={child1Ref}>
          <div className={post.post_content ? "post-content" : "post-content empty-post"} ref={contentRef}>
            {post.post_content}
          </div>
          {uploadedImages[carouselIndex] ?
            <div className="post-media-item">
              {carouselIndex > 0 ?
              <Left className="post-carousel-button post-carousel-left" onClick={() => setCarouselIndex(carouselIndex - 1)}/>
              :
              ""
            }
            <img
            ref={postContent}
            src={uploadedImages[carouselIndex]}
            alt=""
            // className="post-media-item"
            />
            {uploadedImages.length > 1 && carouselIndex < uploadedImages.length - 1 
              ?
              <Right className="post-carousel-button post-carousel-right" onClick={() => setCarouselIndex(carouselIndex + 1)}/>
              :
              ""
            }
            </div>
            :
            ""
          }
        </div>
        <div className="post-content-shadow" ref={child2Ref} style={{height:`${contentHeight}px`}}>
          <div className="post-content-shadow-text post-shadow" style={{height:`${contentHeight - 20}px`}}></div>
          {uploadedImages[carouselIndex] ?
          <div className="post-content-shadow-post post-shadow" style={{height:`${postHeight - 20}px`}}></div>
          :
          ""
          }
        </div>
      </div>
      {postMediaLoaded && (
        <div className="post-media-wrapper">
          <div className="post-media-shadow"></div>
        </div>
      )}

      <div className="post-actions">
        <div className="action-info">
          <div className="action-count"></div>
          {postLiked ? (
            <div
              className="like-button post-action-button liked"
              onClick={handleUnlike}
            >
              <Unlike />
            </div>
          ) : (
            <div
              className="like-button post-action-button unliked"
              onClick={handleLike}
            >
              <Like />
            </div>
          )}
          <div
            className={
              postLiked
                ? "count like-count liked-count"
                : "count like-count unliked-count"
            }
          >
            {postLikes || 0}
          </div>
          <div className="action-count"></div>
          <div
            className="comment-button post-action-button"
            onClick={handleOpenCommentModal}
          >
            <Comment />
          </div>
          <div className="count">{postComments || 0}</div>
          <div className="share-button post-action-button">
            <Share />
          </div>

          <div className="save-button post-action-button">
            <Save />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRender;
