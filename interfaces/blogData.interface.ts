export interface BlogData {
    id: number;
    blog_data_name: string;
    blog_data: string;
    image_id: number | null;
    video_id: number | null;
    created_at: string;
    updated_at: string;
    blog_type_id: number;
    like_count: number;
    dislike_count: number;
    liked_by_user: boolean;
    disliked_by_user: boolean;
    like_counter: Likecounter[];
}

export interface Likecounter {
    id: number;
    user_id: number;
    blog_data_id: number;
    like: number;
    dislike: number;
    created_at: string;
    updated_at: string;
}