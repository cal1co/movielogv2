import { Post } from "../types/PostTypes";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import PostRenderComponent from "../components/PostRenderComponent";
import CommentRenderComponent from "../components/CommentRenderComponent";
import { CommentPost } from "../types/PostTypes";
import CreatePostComponent from '../components/CreatePostComponent'
import './PostRenderPage.css'


const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

function PostRenderPage() {
  const location = useLocation();
  const { postId } = useParams();
  const [postContent, setPostContent] = useState<Post | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentPost[] | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!location.state) {
        getPostData();
      } else {
        setPostContent(location.state.post);
      }
      fetchPostComments();
    }
  }, [isMounted]);

  const getPostData = async (): Promise<void> => {
    if (!postContent) {
      await axios
        .get(`http://localhost:8082/posts/${postId}`, { headers })
        .then((res) => {
          setPostContent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchPostComments = () => {
    axios
      .get(`http://localhost:8082/post/${postId}/comments`, { headers })
      .then((res) => {
        console.log(res.data)
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderComments = (comments: CommentPost[]) => {
    return (
      <React.Fragment>
        {comments.map((comment, idx) => {
          return (
            <CommentRenderComponent
              comment={comment}
              key={comment.comment_id}
            />
          );
        })}
      </React.Fragment>
    );
  };

  if (!postContent) {
    return <div>Loading...</div>;
  } else {
    // console.log(postContent)
  }

  return (
    <div className="PostRenderPage">
      <div className="post-wrapper" >
        <PostRenderComponent post={postContent} />
      </div>
        <CreatePostComponent/>
        <div className="comments-section-title">
          Comments
        </div>
      <div className="comments">
        {comments && renderComments(comments)}
      </div>
    </div>
  );
}

export default PostRenderPage;
