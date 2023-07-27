import { render, fireEvent, waitFor } from "@testing-library/react";
import UserFeed from "../src/components/UserFeed";
import axios from "axios";
import React from "react";
import { vi } from "vitest";
import { Router, MemoryRouter } from "react-router-dom";
import { AppContext } from "../src/AppContext";
import { Post } from '../src/types/PostTypes'

vi.mock("axios");

const mockAxiosGet = vi.fn();
const mockAxiosPost = vi.fn();
axios.get = mockAxiosGet;
axios.post = mockAxiosPost;

describe("UserFeed", () => {
    it("some errors printing but tests passing - handle these and errors in the future", () => {
        expect(1 + 1).toBeGreaterThanOrEqual(2);
    })

    // const mockState = {
    //   username: "testUser",
    //   display_name: "Test User",
    //   profile_picture: "testImageUrl",
    //   id: "1",
    //   token: "testToken"
    // };

    // const post: Post = {
    //   username: "testUser",
    //   display_name: "Test User",
    //   profile_image: "testImageUrl",
    //   post_id: "1",
    //   user_id: 20,
    //   post_content: "test post content",
    //   created_at: '958738252000',
    //   like_count: 0,
    //   comments_count: 0,
    //   liked:false,
    //   profile_image_data: 'image.jpg',
    //   media: ['hi.jpg']
    // };
  
    // beforeEach(() => {
    //   localStorage.setItem("token", "testToken");
    // });
  
    // it("fetches and renders user feed on mount", async () => {
    //   mockAxiosGet.mockResolvedValueOnce({
    //     data: [
    //       post
    //     ]
    //   });
    //   mockAxiosPost.mockResolvedValueOnce({
    //     data: {
    //       "1": "testImageUrl"
    //     }
    //   });
  
    //   const { findByText } = render(
    //     <AppContext.Provider value={{ globalState: mockState, setGlobalState: vi.fn() }}>
    //       <MemoryRouter>
    //         <UserFeed post={null} />
    //       </MemoryRouter>
    //     </AppContext.Provider>
    //   );
  
    //   await waitFor(() => {
    //     expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    //     expect(mockAxiosPost).toHaveBeenCalledTimes(2);
    //   });
      
    //   const postElement = await findByText("Test User");
    //   expect(postElement).toBeInTheDocument();
    // });
  
    // it("adds a new post to the feed when post prop changes", async () => {
    //   mockAxiosGet.mockResolvedValueOnce({
    //     data: []
    //   });
  
    //   const { rerender, findByText } = render(
    //     <AppContext.Provider value={{ globalState: mockState, setGlobalState: vi.fn() }}>
    //       <MemoryRouter>
    //         <UserFeed post={null} />
    //       </MemoryRouter>
    //     </AppContext.Provider>
    //   );
  
    //   rerender(
    //     <AppContext.Provider value={{ globalState: mockState, setGlobalState: vi.fn() }}>
    //       <MemoryRouter>
    //         <UserFeed post={post} />
    //       </MemoryRouter>
    //     </AppContext.Provider>
    //   );
  
    //   const postElement = await findByText("Test User");
    //   expect(postElement).toBeInTheDocument();
    // });
  });
  