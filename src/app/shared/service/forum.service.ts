import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumDTO } from '../model/forumDTO';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private url = "https://pdist-back.onrender.com/api/forums";
  //private url = "http://localhost:8080/api/forums";

  constructor(private http: HttpClient) { }

  addForum(forumData: any): Observable<any> {
    return this.http.post(this.url+"/new", forumData);
  }

  getAllForums(): Observable<ForumDTO[]> {
    return this.http.get<ForumDTO[]>(this.url + "/");
  } 

}
