// CommentModalContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { CombinedPostType } from './types/PostTypes'

type CommentModalContextType = {
  isOpen: boolean;
  openModal: (postId: string) => void;
  closeModal: () => void;
  parentPost: CombinedPostType | null;
  updatePost: (post: CombinedPostType | null) => void;
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
  const [parentPost, setParentPost] = useState<CombinedPostType | null>(null);

  const openModal = (postId: string) => {
    setPostId(postId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updatePost = (updatedPost: CombinedPostType | null) => {
    setParentPost(updatedPost);
  };

  return (
    <CommentModalContext.Provider value={{ isOpen, openModal, closeModal, parentPost, updatePost }}>
      {children}
    </CommentModalContext.Provider>
  );
};
