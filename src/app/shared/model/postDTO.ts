import { SafeUrl } from "@angular/platform-browser";

export interface PostDTO {
    id: string;
    title: string;
    content: string;
    date: Date;
    likes: number;
    dislikes: number;
    user: string;
    userId: string;
    fileId: string;
    fileType: string;
    fileUrl: SafeUrl;
    fileName: string;
    file?: {
        data: string;
        contentType: string;  
        filename: string;  
      }
}