export type Post = {
    post_id: string,
    user_id: number,
    post_content: string,
    created_at: string,
    like_count: number,
    comments_count: number,
    liked: boolean
    username:string,
    display_name:string,
    profile_image:string
    profile_image_data:string
}

export type Comment = {
    comment_id: string,
    user_id: number,
    parent_post_id: string,
    comment_content: string,
    created_at: string,
    like_count: number; 
    comments_count: number,
    liked: boolean
}