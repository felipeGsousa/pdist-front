import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private url = "https://pdist-back.onrender.com/api/forums";

  constructor(private http: HttpClient) { }

  addForum(forumData: any): Observable<any> {
    return this.http.post(this.url+"/new", forumData);
  }

}
