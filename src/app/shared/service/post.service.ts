import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from '../model/postDTO';
import { FileDTO } from '../model/fileDTO';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "https://pdist-back.onrender.com/api/posts";
  //private url = "http://localhost:8082/api/posts"
  //private fileUrl = "http://localhost:8081/api/files"
  //private fileUrl = "https://pdist-file-service.onrender.com/api/files"

  private id: string = "";

  constructor(private http: HttpClient, private apollo: Apollo) { }

  addPost(forumId:string, postData: any): Observable<any> {
    return this.http.post(this.url+`/${forumId}/new`, postData, { responseType: 'text' });
  }

  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.url+"/");
  }

  getForumPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.url+`/${localStorage.getItem("forumId")}/forum_posts`);
  }

  getPost(): Observable<PostDTO> {
    return this.http.get<PostDTO>(this.url + `/${localStorage.getItem("postId")}`);
  }

  //getFile(): Observable<FileDTO> {
  //  return this.http.get<FileDTO>(this.fileUrl+"/get/66cd9814b4e0df7464d8107e");
  //}

  setPostId(postId: string) {
    this.id = postId;
    localStorage.setItem('postId', postId);
  }

  getPostId(): string{
    return this.id;
  }

  getRecentPosts(userId: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetRecentPosts($userId: ID!) {
          getRecentPosts(userId: $userId) {
            _id
            title
            content
            createdAt
            file {
              contentType
              data
              name
            }
            fileId
          }
        }
      `,
      variables: {
        userId: userId
      }
    });
  }
}
