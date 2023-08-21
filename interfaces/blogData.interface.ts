export interface BlogData {
    id: number;
    blog_data_name: string;
    blog_data: string;
    image_id: number | null;
    video_id: number | null;
    created_at: string;
    updated_at: string;
    blog_type_id: number;
}
