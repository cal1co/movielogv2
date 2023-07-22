// CommentModalContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Post } from './types/PostTypes'

type CommentModalContextType = {
  isOpen: boolean;
  openModal: (postId: string) => void;
  closeModal: () => void;
  parentPost: Post | null;
  updatePost: (post: Post | null) => void;
};

export const CommentModalContext = createContext<CommentModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  parentPost: null,
  updatePost: () => {},
});

export const CommentModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>('');
  const [parentPost, setParentPost] = useState<Post | null>(null);

  const openModal = (postId: string) => {
    setPostId(postId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updatePost = (updatedPost: Post | null) => {
    setParentPost(updatedPost);
  };

  return (
    <CommentModalContext.Provider value={{ isOpen, openModal, closeModal, parentPost, updatePost }}>
      {children}
    </CommentModalContext.Provider>
  );
};
