import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchPost } from '../types/PostTypes'

type QueryProps = {
    query: string
}

const PostSearchResultsComponent: React.FC<QueryProps> = ({query}) => {
    
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [postResults, setPostResults] = useState<SearchPost[] | null>(null)

  useEffect(() => {
      fetchUsers(query)
  }, [query, page])
  
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
      console.log(res.data)
      setPostResults(res.data)
    }) 
    .catch( err => {
      console.log(err)
      setPostResults(null)
    })
    setIsLoading(false)
  }

  const printPosts = (posts: SearchPost[]) => {
    console.log("called printposts")
      return (
        <React.Fragment>
          {posts.map((post, _) => {
            console.log("post:", post)
          return(
            <div key={post.id}>
              <div className="post-content-search-result">{post.post_content}</div>
            </div>
          )
          })}
          {isLoading && <div className={isLoading ? "loading" : ""}>Loading...</div>}
        </React.Fragment>
      );
    };

  return (
    <div className="post-search-results">
      <div className="post-search-results-wrapper">{postResults && printPosts(postResults)}</div>
    </div>
  )
}

export default PostSearchResultsComponent