// import './SignupPage.css'
import React, { useState } from "react";
import { User } from "../types/UserTypes";
import { SignupPageProps } from "../types/FormTypes";
import axios from "axios";
import "./LoginPage.css";
import { ReactComponent as PasswordEye } from "../../icons/eye-regular.svg";
import { ReactComponent as PasswordEyeSlashed } from "../../icons/eye-slash-regular.svg";
import { useNavigate } from 'react-router-dom';

function SignupPage({ handleSubmit }: SignupPageProps) {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passFieldType, setPassFieldType] = useState<"password" | "text">("password")

  const navigate = useNavigate()

  const togglePassVisibility = () => {
    if (passFieldType === "password") {
      setPassFieldType("text");
    } else {
      setPassFieldType("password");
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        user
      );

      localStorage.setItem("token", response.data.token);
      navigate("/")
    } catch (error) {
      setErrorMessage("" + error);
    }
  };

  return (
    <div className="login-signup">
      <div className="signup-form">
        <div className="form-content">
          <div className="sign-in-message-content">
            <div className="sign-in-message">Sign up for Yuzu</div>
            <div className="sign-in-tag">Create an account, follow your friends and make new ones!</div>
          </div>
          <form onSubmit={handleFormSubmit}
          aria-label="form">
            <div>
              <input
                // type="text"
                placeholder="username"
                id="username"
                className="login-input top-input"
                name="username"
                maxLength={15}
                minLength={3}
                value={user.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className="login-input"
                placeholder="email"
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="password-input">
              <input
                className="login-input bottom-input show-password"
                placeholder="password"
                type={passFieldType}
                id="password passwordField"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              <div className="eye-icon" data-testid="eye-icon" onClick={togglePassVisibility}>
                {passFieldType === "password" ?
                <PasswordEye />
                :
                <PasswordEyeSlashed/>
                }
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-signup-submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
