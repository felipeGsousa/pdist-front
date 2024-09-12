import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  //private url = "https://pdist-back.onrender.com/api/comments";
  private url = "http://localhost:8082/api/comments";

  constructor(private http: HttpClient) { }

  addComment(postId: string, commentData: any): Observable<any>{
    console.log(commentData)
    return this.http.post(this.url + `/${postId}/new`, commentData, { responseType: 'text' });
  }

  addCommentTo(commentId:string, commentData:any): Observable<any>{
    return this.http.post(this.url + `/${commentId}/newTo`, commentData, { responseType: 'text' });
  }
}
