import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../types/PostTypes'
type QueryProps = {
    query: string
}

const PostSearchResultsComponent: React.FC<QueryProps> = ({query}) => {
    
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false)
    const [postResults, setPostResults] = useState<Post[] | null>(null)

    useEffect(() => {
        fetchUsers(query)
    },[query, page])
    
    const fetchUsers = async (query: string) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    await axios.get(`http://localhost:3000/api/auth/search/post/${query}`, {
        headers
    })
    .then( res => {
        setPostResults(res.data.response)
    }) 
    .catch( err => {
        // console.log(err)
    })
    setIsLoading(false)
    }


    const printPosts = (posts: Post[]) => {
        return (
          <React.Fragment>
            {posts.map((post, idx) => {
            return(
              <div key={post.post_id}>
                <div className="">{post.post_content}</div>
              </div>
            )
            })}
            {isLoading && <div className={isLoading ? "loading" : ""}>Loading...</div>}
          </React.Fragment>
        );
      };

    return (
        <div className="">
        Search for posts related to {query}:
        <div className="">{postResults && printPosts(postResults)}</div>
        </div>
    )
}

export default PostSearchResultsComponent