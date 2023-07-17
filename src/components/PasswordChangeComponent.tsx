import React, { useState } from "react";
import "./PasswordChangeComponent.css";
import axios from "axios";

const PasswordChangeComponent = () => {
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios
      .post(
        "http://localhost:3000/api/auth/user/update/password",
        {
          password,
          newPass,
        },
        { headers }
      )
      .then((res) => {
        setMessage("Password updated successfully");
        setError("");
      })
      .catch((err) => {
        console.error("Error updating password:", err.response.data);
        setMessage("");
        setError(err.response.data.message);
      });
  };
  return (
    <div className="pass-change-view">
      <h2>Change Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="pass-change-input">
            <label htmlFor="password">Existing Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pass-change-input">
            <label htmlFor="newPass">New Password:</label>
            <input
              type="password"
              id="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default PasswordChangeComponent;
