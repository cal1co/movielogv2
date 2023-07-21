import { useState } from "react";
import { UserLogin } from "../types/UserTypes";
import { LoginPageProps } from "../types/FormTypes";
import axios, { AxiosError } from "axios";
import "./LoginPage.css";
import { ReactComponent as PasswordEye } from "../../icons/eye-regular.svg";
import { ReactComponent as PasswordEyeSlashed } from "../../icons/eye-slash-regular.svg";

function LoginPage({ handleSubmit }: LoginPageProps) {
  const [user, setUser] = useState<UserLogin>({
    usernameOrEmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("" as string);
  const [passFieldType, setPassFieldType] = useState<"password" | "text">("password")

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
        "http://localhost:3000/api/auth/login",
        user
      );

      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      const err = error as AxiosError
      console.log(error)
      setErrorMessage("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div className="login-signup">
      <div className="login-form">
        <div className="form-content">
          <div className="sign-in-message-content">
            <div className="sign-in-message">Welcome back!</div>
            <div className="sign-in-tag">We're glad to see you again</div>
          </div>
          <form
            onSubmit={handleFormSubmit}
            aria-label="form"
            className="login-signup-form"
          >
            <div>
              <label htmlFor="usernameOrEmail" className="login-signup-label">
                ACCOUNT INFORMATION
              </label>

              <input
                type=""
                placeholder="Username or email"
                className="login-input top-input"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={user.usernameOrEmail}
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
              <div className="eye-icon" onClick={togglePassVisibility}>
                {passFieldType === "password" ?
                <PasswordEye />
                :
                <PasswordEyeSlashed/>
                }
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-signup-submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
