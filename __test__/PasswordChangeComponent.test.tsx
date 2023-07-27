import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import axios from "axios";
import PasswordChangeComponent from "../src/components/PasswordChangeComponent";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import React from "react";

vi.mock("axios");

describe("PasswordChangeComponent", () => {
  beforeAll(() => {
    global.localStorage = {
      getItem: vi.fn(() => "mockToken"),
      setItem: vi.fn(),
      clear: vi.fn(),
    } as any;
  });
  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/user/testuser"]}>
          <PasswordChangeComponent />
        </MemoryRouter>
      );
    });
  });

  it("should change password and display success message", async () => {
    axios.post.mockResolvedValue({ data: {} });
    fireEvent.change(screen.getByLabelText(/Existing Password:/i), {
      target: { value: "oldPassword" },
    });
    fireEvent.change(screen.getByLabelText(/New Password:/i), {
      target: { value: "newPassword" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() =>
      expect(
        screen.getByText("Password updated successfully")
      ).toBeInTheDocument()
    );
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/api/auth/user/update/password",
      {
        password: "oldPassword",
        newPass: "newPassword",
      },
      {
        headers: {
          Authorization: `Bearer mockToken`,
        },
      }
    );
  });

  it("should display error message when API request fails", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Password update failed" } },
    });

    fireEvent.change(screen.getByLabelText(/Existing Password:/i), {
      target: { value: "oldPassword" },
    });
    fireEvent.change(screen.getByLabelText(/New Password:/i), {
      target: { value: "newPassword" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() =>
      expect(
        screen.getByText("Error: Password update failed")
      ).toBeInTheDocument()
    );
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/api/auth/user/update/password",
      {
        password: "oldPassword",
        newPass: "newPassword",
      },
      {
        headers: {
          Authorization: `Bearer mockToken`,
        },
      }
    );
  });
});
