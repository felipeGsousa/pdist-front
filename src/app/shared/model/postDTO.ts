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
    file?: {
        data: ArrayBuffer;
        contentType: string;  
        filename: string;  
      }
}