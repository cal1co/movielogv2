
import { Post } from '../types/PostTypes'
import { useState } from 'react'
import './PostRenderComponent.css'
import axios from 'axios'
import CommentModal from './CommentModal'
import { useNavigate } from 'react-router-dom'

type QueryProps = {
    post: Post
}
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`,
};
const PostRender: React.FC<QueryProps> = ({post}) => {

    const [postLiked, setPostLiked] = useState<boolean>(post.liked || false);
    const [postLikes, setPostLikes] = useState<number>(post.like_count);
    const [postComments, setPostComments] = useState<number>(post.comments_count)
    const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleOpenCommentModal = ():void => {
        setIsCommentModalOpen(true)
    }
    const handleCloseCommentModal = ():void => {
        setIsCommentModalOpen(false)
    }
    const handleComment = async (comment:string):Promise<void> => {
        console.log("MAKE REQ: ", comment)
        await axios.post(`http://localhost:8080/post/${post.post_id}/comment`, {
            comment_content:comment
        }, {headers})
        .then(res => {
            console.log(res.data)
            setPostComments(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleLike = async ():Promise<void> => {
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
    const handleUnlike = async () => {
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
    const redirectToPostPage = ():void => {
        navigate(`/${post.user_id}/post/${post.post_id}`)
    }

    const handleDate = (date:string):string => {
        const dateObj = new Date(date)
        const formattedDate = dateObj.toLocaleDateString();
        const formattedTime = dateObj.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`
    }

    return (
        <div className="post" 
        // onClick={redirectToPostPage}
        >
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
                    <span className="count">{postComments || 0}</span>
                    </div>
                    <button className="comment-button" onClick={handleOpenCommentModal}>Comment</button>
                </div>
                <button className="share-button">Share</button>
                <button className="settings-button">&#x2026;</button>
            </div>
            <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseCommentModal} onSubmit={handleComment} />
        </div>

    )
}

export default PostRender