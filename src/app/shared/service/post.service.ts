import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from '../model/postDTO';
import { FileDTO } from '../model/fileDTO';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //private url = "https://pdist-back.onrender.com/api/posts";
  private url = "http://localhost:8080/api/posts"
  private fileUrl = "http://localhost:8080/api/files"

  constructor(private http: HttpClient) { }

  addPost(forumId:string, postData: any): Observable<any> {
    return this.http.post(this.url+`/${forumId}/new`, postData);
  }

  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.url+"/");
  }

  getFile(): Observable<FileDTO> {
    return this.http.get<FileDTO>(this.fileUrl+"/get/66cd9814b4e0df7464d8107e");
  }
}
