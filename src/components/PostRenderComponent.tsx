
import { Post } from '../types/PostTypes'
import { useState } from 'react'
import './PostRenderComponent.css'
import axios from 'axios'


type QueryProps = {
    post: Post
}
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`,
};
const PostRender: React.FC<QueryProps> = ({post}) => {

    const [postLiked, setPostLiked] = useState<boolean>(post.liked || false)
    const [postLikes, setPostLikes] = useState<number>(post.like_count)

    const handleLike = async () => {
        await axios.post(`http://localhost:8080/post/like/${post.post_id}`, {}, {
            headers
        })
        .then(res => {
            console.log(res)
            setPostLikes(res.data)
            setPostLiked(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleUnlike = async() => {
        await axios.post(`http://localhost:8080/post/unlike/${post.post_id}`, {}, {
            headers
        })
        .then(res => {
            console.log(res)
            setPostLikes(res.data)
            setPostLiked(false)
        })
        .catch(err => {
            console.log(err)
        })
    }


    const handleDate = (date:string):string => {
        const dateObj = new Date(date)
        const formattedDate = dateObj.toLocaleDateString();
        const formattedTime = dateObj.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`
    }

    return (
        <div className="post">
            <div className="post-header">
                <div className="user-profile">
                <img src="user-profile-image.jpg" alt="U" className="profile-image"/>
                <span className="username">@{post.user_id}</span>
                </div>
                <div className="post-info">
                <span className="created-date">{handleDate(post.created_at)}</span>
                </div>
            </div>
            <div className="post-content">
                {post.post_content}
            </div>
            <div className="post-actions">
                <div className="action-info">
                    <div className="action-count">
                    <span className="count">{postLikes || 0}</span>
                    </div>
                    {
                    postLiked ?
                    <button className="like-button" onClick={handleUnlike}>Unlike</button>
                    :
                    <button className="like-button" onClick={handleLike}>Like</button>
                    }
                </div>
                <div className="action-info">
                    <div className="action-count">
                    <span className="count">{post.comment_count || 0}</span>
                    </div>
                    <button className="comment-button">Comment</button>
                </div>
                <button className="share-button">Share</button>
                <button className="settings-button">&#x2026;</button>
            </div>
        </div>

    )
}

export default PostRender