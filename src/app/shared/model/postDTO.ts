import { SafeUrl } from "@angular/platform-browser";
import { CommentDTO } from "./commentDTO";

export interface PostDTO {
    id: string;
    title: string;
    content: string;
    date: Date;
    likes: number;
    dislikes: number;
    userName: string;
    userEmail: string;
    userPhoto: string;
    userId: string;
    fileId: string;
    fileType: string;
    fileUrl: SafeUrl;
    fileName: string;
    comments: CommentDTO[];
    file?: {
        data: string;
        contentType: string;  
        filename: string;  
      }
    likeButtonColor: string;
    dislikeButtonColor: string;
}