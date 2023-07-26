import { render, fireEvent } from "@testing-library/react";
import UserResultsComponent from "../src/components/UserResultsComponent";
import axios from "axios";
import React from "react";
import { vi } from "vitest";
import { Router, useNavigate, MemoryRouter } from "react-router-dom";

vi.mock("axios");
vi.mock("react-router-dom", async () => ({
  ...vi.importActual("react-router-dom"),
  MemoryRouter: (await vi.importActual<typeof import("react-router-dom")>("react-router-dom")).MemoryRouter,
  useNavigate: () => vi.fn(),
}));

describe("UserResultsComponent", () => {
  it("fetches and displays user results on load", async () => {
    const mockAxiosGet = vi
      .fn()
      .mockResolvedValueOnce({
        data: { response: [{ username: "testUser", display_name: "Test User", profile_image: "image_url", id: "1" }] },
      })
      .mockResolvedValueOnce({
        data: [{ username: "testUser", display_name: "Test User", profile_image: "image_url", id: "1" }],
      });
    axios.get = mockAxiosGet;

    const { findByText } = render(<MemoryRouter><UserResultsComponent query="testUser" /></MemoryRouter>);

    await findByText("testUser");
    await findByText("Test User");
    expect(mockAxiosGet).toHaveBeenCalledTimes(2);
  });

  it("handles fetch errors gracefully", async () => {
    const mockAxiosGet = vi.fn().mockRejectedValue(new Error("Network error"));
    axios.get = mockAxiosGet;

    const { findByText } = render(<MemoryRouter><UserResultsComponent query="testUser" /></MemoryRouter>);

    await findByText("Loading...");
    expect(mockAxiosGet).toHaveBeenCalled();
  });

  it("navigates to user page on user result click", async () => {
    const navigate = vi.fn();
    vi.mock('react-router-dom/useNavigate', navigate);

    const mockAxiosGet = vi
      .fn()
      .mockResolvedValueOnce({
        data: { response: [{ username: "testUser", display_name: "Test User", profile_image: "image_url", id: "1" }] },
      })
      .mockResolvedValueOnce({
        data: [{ username: "testUser", display_name: "Test User", profile_image: "image_url", id: "1" }],
      });
    axios.get = mockAxiosGet;

    const { findByText } = render(<MemoryRouter><UserResultsComponent query="testUser" /></MemoryRouter>);

    const userResult = await findByText("testUser");
    fireEvent.click(userResult);

    expect(navigate).toHaveBeenCalledWith("/testUser");
  });
});
