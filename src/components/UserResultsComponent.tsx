// import './UserResultsComponent.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



// http://localhost:5173/search/film?query=spiderman

type QueryProps = {
  query: string
}
type User = {
  id: number,
  username:string
}

const UserResultsComponent: React.FC<QueryProps> = ({query}) => {
  
  const [storedQuery, setStoredQuery] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [userResults, setUserResults] = useState<User[] | null>(null)
  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    setIsMounted(true);
  }, [])
  useEffect(() => {
    if (isMounted) {
        fetchUsers(query)
    }
  },[query, isMounted, page])

  const fetchUsers = async (query: string) => {
    setIsLoading(true);
    setStoredQuery(query)
    await axios.get(`http://localhost:3000/api/auth/search/${query}`, {
      headers
    })
    .then( res => {
      setUserResults(res.data.response)
    }) 
    .catch( err => {
      console.log(err)
    })
    setIsLoading(false)
  }

  const printUsers = (users: User[]) => {
    return (
      <React.Fragment>
        {users.map((user, idx) => {
        return(
          <div key={user.id} onClick={() => navigate(`/${user.username}`)}>
            <div className="">{user.username}</div>
          </div>
        )
        })}
        {isLoading && <div className={isLoading ? "loading" : ""}>Loading...</div>}
      </React.Fragment>
    );
  };

  return (
    <div className="UserResultsComponent">
        Search for users related to {query}
        <div className="">{userResults && printUsers(userResults)}</div>
    </div>
  )
}


export default UserResultsComponent

