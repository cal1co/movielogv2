
import { Post } from '../types/PostTypes'
import { useState } from 'react'
import './PostRenderComponent.css'
import axios from 'axios'
import CommentModal from './CommentModal'
import { useNavigate } from 'react-router-dom'
import Like from '../../icons/heart-regular.svg'
import Unlike from '../../icons/heart-solid.svg'
import Comment from '../../icons/comment-regular.svg'

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
        await axios.post(`http://localhost:8082/post/${post.post_id}/comment`, {
            comment_content:comment
        }, {headers})
        .then(res => {
            setPostComments(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleLike = async ():Promise<void> => {
        await axios.post(`http://localhost:8082/post/like/${post.post_id}`, {}, {
            headers
        })
        .then(res => {
            setPostLikes(res.data)
            setPostLiked(true)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleUnlike = async () => {
        await axios.post(`http://localhost:8082/post/unlike/${post.post_id}`, {}, {
            headers
        })
        .then(res => {
            setPostLikes(res.data)
            setPostLiked(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>):void => {
        const target = event.target as HTMLElement;
        const isPostContent = target.classList.contains('post-content')
        const isPostHeader = target.classList.contains('post-header')
        const isPostActions = target.classList.contains('post-actions')
        if (isPostContent || isPostHeader || isPostActions) {
            redirectToPostPage()
        } else {
            // console.log("NOT CONTENT", target.classList)
        }
    }
    const redirectToPostPage = ():void => {
        navigate(`/${post.user_id}/post/${post.post_id}`, { state: {post} })
    }
    const handleDate = (date:string):string => {
        const dateObj = new Date(date)
        const formattedDate = dateObj.toLocaleDateString();
        const formattedTime = dateObj.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`
    }
    const postAge = (date:string):string => {
        const dateObj = new Date(date)
        const currentDateTime = new Date();
        const timeDiff = currentDateTime.getTime() - dateObj.getTime();
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours

        if (hoursDiff >= 24) {
            const daysDiff = Math.floor(hoursDiff / 24);
            return `${daysDiff}d`;
        }

        return `${hoursDiff}h`;
    }

    return (
        <div className="post" 
        onClick={handleClick}
        >
            <div className="post-header">
                <div className="user-profile">
                <img src={post.profile_image} alt="U" className="profile-image"/>
                <span className="username">@{post.username}</span>
                </div>
                <div className="post-info">
                <span className="created-date">{postAge(post.created_at)}</span>
                </div>
            </div>
            <div className="post-content">
                {post.post_content}
            </div>
            <div className="post-actions">
                <div className="action-info">
                    <div className="action-count">
                    </div>
                    {
                    postLiked ?
                    <div className="like-button" onClick={handleUnlike}>
                        <img src={Unlike} alt="" />
                    </div>
                    :
                    <div className="like-button" onClick={handleLike}>
                        <img src={Like} alt="like" /> 
                    </div>
                    }
                    <div className="count">{postLikes || 0}</div>

                </div>
                <div className="action-info">
                    <div className="action-count">
                    </div>
                    <div className="comment-button" onClick={handleOpenCommentModal}>
                        <img src={Comment} alt="" />
                    </div>
                    <div className="count">{postComments || 0}</div>
                </div>
                <button className="share-button">Share</button>
                <button className="settings-button">&#x2026;</button>
            </div>
            <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseCommentModal} onSubmit={handleComment} />
        </div>

    )
}

export default PostRender