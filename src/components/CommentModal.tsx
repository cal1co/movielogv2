import "./CommentModal.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CommentModalContext } from "../CommentModalContext";
import { Post, CombinedPostType } from "../types/PostTypes";
import postAgeHandler from "../utils/postAgeHandler";
import { AppContext } from "../AppContext";

type QueryProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: CombinedPostType, comment: string) => void;
  post: CombinedPostType;
};

const CommentModal: React.FC<QueryProps> = ({
  isOpen,
  onClose,
  onSubmit,
  post,
}) => {
  const { globalState } = useContext(AppContext);

  const [comment, setComment] = useState("");

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    setComment("");
    console.log(isOpen);
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(post, comment);
    setComment("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="comment-modal" ref={modalRef}>
        <div className="post-reference">
          <img
            src={post.profile_image}
            className="post-reference-pfp"
            alt="modal reply original poster user image"
          />
          <div className="post-reference-content">
            <div className="post-reference-user-top-line">
              <div className="modal-post-username">
                <div className="reference-name-display">
                  {post.display_name}
                </div>
                <div className="reference-name-user">@{post.username}</div>
              </div>
              <div className="modal-post-createdate">
                - {postAgeHandler(post.created_at)}
              </div>
            </div>
            <div className="modal-post-content">{post.content}</div>
          </div>
        </div>

        <div className="comment-modal-buffer">
          <div className="comment-modal-buffer-line-wrapper">
            <div className="comment-modal-buffer-line"></div>
          </div>
          <div className="reply-info"></div>
        </div>

        <div className="comment-user-section">
          <img
            src={globalState.profile_picture}
            className="post-reference-pfp"
            alt="user profile image"
          />
          <textarea
            value={comment}
            onChange={handleChange}
            placeholder="Reply"
            rows={3}
            className="comment-modal-compose"
          />
        </div>
        <div className="comment-modal-utils">
          <div className="character-count">{comment.length}/256</div>
          <div className="modal-buttons">
            <button className="submit-comment-button" onClick={handleSubmit}>
              Reply
            </button>
            {/* <button onClick={onClose}>Cancel</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
