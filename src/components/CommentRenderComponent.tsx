import { Comment } from '../types/PostTypes'


type QueryProps = {
    comment: Comment
}

const PostRender: React.FC<QueryProps> = ({comment}) => {
    return (
        <div className="">
            {comment.user_id}
            {comment.like_count}
            {comment.comments_count}
            {comment.comment_content}
        </div>
    )
}

export default PostRender 