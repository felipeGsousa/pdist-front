import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumDTO } from '../model/forumDTO';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private id: string = "";

  private url = "https://pdist-back.onrender.com/api/forums";
  //private url = "http://localhost:8082/api/forums";

  constructor(private http: HttpClient) {

  }

  addForum(forumData: any): Observable<any> {
    return this.http.post(this.url+"/new", forumData);
  }

  getAllForums(): Observable<ForumDTO[]> {
    return this.http.get<ForumDTO[]>(this.url + "/");
  } 

  getForum(): Observable<ForumDTO> {
    return this.http.get<ForumDTO>(this.url + `/${localStorage.getItem("forumId")}`);
  }

  joinForum(forumId: string, userId: string): Observable<ForumDTO>{
    return this.http.put<ForumDTO>(this.url + `/join/${forumId}`, userId);
  }

  leaveForum(forumId: string, userId: string): Observable<ForumDTO>{
    return this.http.put<ForumDTO>(this.url + `/leave/${forumId}`, userId);
  }

  setForumId(forumId: string) {
    this.id = forumId;
    localStorage.setItem('forumId', forumId);
  }
}
