export type Post = {
    post_id: string,
    user_id: number,
    post_content: string,
    created_at: string,
    like_count: number,
    comment_count: number,
    liked: boolean
}