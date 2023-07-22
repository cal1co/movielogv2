import "./CommentModal.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CommentModalContext } from "../CommentModalContext";
import { Post } from '../types/PostTypes'

type QueryProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Post, comment: string) => void;
  post: Post
};

const CommentModal: React.FC<QueryProps> = ({ isOpen, onClose, onSubmit, post }) => {
//   const { isOpen, closeModal } = useContext(CommentModalContext);

  const [comment, setComment] = useState("");

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    console.log(isOpen)
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
      <div className="modal" ref={modalRef}>
        <h2>Compose Comment</h2>
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows={3}
        />
        <div className="character-count">{comment.length}/200</div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
