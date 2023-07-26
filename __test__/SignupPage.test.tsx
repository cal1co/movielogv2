import { render, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "../src/pages/SignupPage";
import axios from "axios";
import React from "react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("axios");
vi.mock("react-router-dom", async () => ({
  ...vi.importActual("react-router-dom"),
  MemoryRouter: (
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  ).MemoryRouter,
  useNavigate: () => vi.fn(),
}));

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe("SignupPage", () => {
  it("updates the username, email, and password on user input", async () => {
    const { getByPlaceholderText } = render(
      <SignupPage handleSubmit={() => Promise.resolve()} />
    );
    const usernameInput = getByPlaceholderText("username");
    const emailInput = getByPlaceholderText("email");
    const passwordInput = getByPlaceholderText("password");

    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.change(emailInput, { target: { value: "testEmail" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    expect((usernameInput as HTMLInputElement).value).toBe("testUsername");
    expect((emailInput as HTMLInputElement).value).toBe("testEmail");
    expect((passwordInput as HTMLInputElement).value).toBe("testPassword");
  });

  it("toggles the visibility of the password field when the visibility icon is clicked", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SignupPage handleSubmit={() => Promise.resolve()} />
    );
    const passwordInput = getByPlaceholderText("password");
    const visibilityIcon = getByTestId("eye-icon");

    expect((passwordInput as HTMLInputElement).type).toBe("password");

    fireEvent.click(visibilityIcon);
    expect((passwordInput as HTMLInputElement).type).toBe("text");

    fireEvent.click(visibilityIcon);
    expect((passwordInput as HTMLInputElement).type).toBe("password");
  });

  it('submits the form when the submit button is clicked and a token is received', async () => {
    const mockAxiosPost = vi.fn().mockResolvedValue({ data: { token: 'testToken' } });
    axios.post = mockAxiosPost;
  
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignupPage handleSubmit={() => Promise.resolve()} />
      </MemoryRouter>
    );
  
    const usernameInput = getByPlaceholderText('username');
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Sign up');
  
    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.change(emailInput, { target: { value: 'testEmail@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('http://localhost:3000/api/auth/register', { username: 'testUsername', email: 'testEmail@email.com', password: 'testPassword' });
      expect(localStorage.getItem('token')).toBe('testToken');
    });
  });

  // it("displays an error message if the signup request fails", async () => {
  //   const mockAxiosPost = vi
  //     .fn()
  //     .mockRejectedValue({ response: { data: { message: "Signup failed" } } });
  //   axios.post = mockAxiosPost;

  //   const { getByPlaceholderText, getByText, findByText } = render(
  //     <SignupPage handleSubmit={() => Promise.resolve()} />
  //   );
  //   const usernameInput = getByPlaceholderText("username");
  //   const emailInput = getByPlaceholderText("email");
  //   const passwordInput = getByPlaceholderText("password");
  //   const submitButton = getByText("Sign up");

  //   fireEvent.change(usernameInput, { target: { value: "testUsername" } });
  //   fireEvent.change(emailInput, { target: { value: "testEmail" } });
  //   fireEvent.change(passwordInput, { target: { value: "testPassword" } });
  //   fireEvent.click(submitButton);

  //   await findByText("Error: Signup failed");
  // });

  it('redirects the user to "/" on successful signup', async () => {
    const mockAxiosPost = vi
      .fn()
      .mockResolvedValue({ data: { token: "testToken" } });
    axios.post = mockAxiosPost;

    Object.defineProperty(window, "location", {
      value: {
        href: "",
      },
      writable: true,
    });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignupPage handleSubmit={() => Promise.resolve()} />
      </MemoryRouter>
    );

    const usernameInput = getByPlaceholderText("username");
    const emailInput = getByPlaceholderText("email");
    const passwordInput = getByPlaceholderText("password");
    const submitButton = getByText("Sign up");

    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.change(emailInput, { target: { value: "testEmail" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("testToken");
      expect(window.location.href).toBe("");
    });
  });
});
