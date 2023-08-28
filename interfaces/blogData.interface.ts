
export interface BlogData {
    id:               number;
    blog_data_name:   string;
    blog_data:        string;
    image_id:         null;
    video_id:         null;
    created_at:       Date;
    updated_at:       Date;
    blog_type_id:     number;
    like_count:       number;
    dislike_count:    number;
    liked_by_user:    boolean;
    disliked_by_user: boolean;
    like_counter:     LikeCounter[];
    comments:         Comment[];
}

export interface Comment {
    id:           number;
    user_id:      number;
    blog_data_id: number;
    data:         string;
    created_at:   Date;
    updated_at:   Date;
    username:     string;
}

export interface LikeCounter {
    id:           number;
    user_id:      number;
    blog_data_id: number;
    like:         number;
    dislike:      number;
    created_at:   Date;
    updated_at:   Date;
}
