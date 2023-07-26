import "./UserResultsComponent.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/UserTypes";


type QueryProps = {
  query: string;
};

const UserResultsComponent: React.FC<QueryProps> = ({ query }) => {

  const navigate = useNavigate();
  const [storedQuery, setStoredQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userResults, setUserResults] = useState<UserData[] | null>(null);


  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };


  useEffect(() => {
    fetchUsers(query);
  }, [query]);

  const fetchUsers = async (query: string) => {
    setIsLoading(true);
    setStoredQuery(query);
    await axios
      .get(`http://localhost:3000/api/auth/search/user/${query}`, {
        headers,
      })
      .then((res) => {
        fetchUserData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
        setUserResults(null)
      });
    setIsLoading(false);
  };

  const fetchUserData = async (users: UserData[]) => {
    await axios
      .post(
        `http://localhost:3000/api/auth//s3image/fetch/images`,
        { users: users },
        {
          headers,
        }
      )
      .then((res) => {
        setUserResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const printUsers = (users: UserData[]) => {
    return (
      <React.Fragment>
        {users.map((user, _) => {
          return (
            <div
              key={user.username + user.id}
              onClick={() => navigate(`/${user.username}`)}
              className="rendered-user-search-result"
            >
              <img
                className="profile-image-search"
                src={user.profile_image}
                alt=""
              />
              <div className="username-details">
                <div className="username-search">{user.username}</div>
                <div className="display-name-search">{user.display_name}</div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className={isLoading ? "loading" : ""}>Loading...</div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="UserResultsComponent">
      <div className="">{userResults && printUsers(userResults)}</div>
    </div>
  );
};

export default UserResultsComponent;
