import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import React from "react";
import axios from "axios";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PostRender from "../src/components/PostRenderComponent";
import { CommentModalContext } from "../src/CommentModalContext";
import { vi } from "vitest";

vi.mock("axios");
const post = {
  post_id: "1",
  user_id: "1",
  post_content: "This is a test post",
  like_count: 10,
  comments_count: 5,
  liked: false,
  media: ["image1", "image2"],
};

const headers = {
  Authorization: `Bearer token`,
};

describe("PostRender", () => {
  let openModal, updatePost;

  beforeEach(async () => {
    openModal = vi.fn();
    updatePost = vi.fn();

    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <CommentModalContext.Provider value={{ openModal, updatePost }}>
            <PostRender post={post} />
          </CommentModalContext.Provider>
        </MemoryRouter>
      );
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <CommentModalContext.Provider value={{ openModal, updatePost }}>
          <PostRender post={post} />
        </CommentModalContext.Provider>
      </MemoryRouter>
    );
    expect(getByText(post.post_content)).toBeInTheDocument();
  });

  it("calls axios to fetch media on mount", async () => {
    axios.post.mockResolvedValueOnce({ data: ["image1.jpg", "image2.jpg"] });

    act(() => {
      const { getByText } = render(
        <MemoryRouter>
          <CommentModalContext.Provider value={{ openModal, updatePost }}>
            <PostRender post={post} />
          </CommentModalContext.Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:3000/api/auth/s3image/post/images`,
      {
        media: post.media,
      }
    );
  });

  it("opens comment modal on comment button click", () => {
    const commentButton = screen.getByRole("button", { name: /comment/i });
    fireEvent.click(commentButton);

    expect(openModal).toHaveBeenCalledTimes(1);
    expect(updatePost).toHaveBeenCalledTimes(1);
  });

  it("likes post on like button click", async () => {
    axios.post.mockResolvedValueOnce({ data: post.like_count + 1 });

    const likeButton = screen.getByRole("button", { name: /like/i });
    fireEvent.click(likeButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:8082/post/like/${post.post_id}`,
      {},
      { headers }
    );
  });

});
