export interface CommentDTO {
    id: string;
    likes: number;
    dislikes: number;
    userName: string;
    userPhoto: string;
    userId: string;
    data: string;
    comments: CommentDTO[];
    date: Date; 
}