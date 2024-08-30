import { PostDTO } from "./postDTO";

export interface ForumDTO{
    id: string;
    userId: string;
    description: string;
    name: string;
    created: Date;
    topic: string;
    banner: string;
    posts: PostDTO[];
    users: string[];
}
