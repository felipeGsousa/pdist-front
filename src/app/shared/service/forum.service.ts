import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private url = "http://localhost:8080/api/forums";

  constructor(private http: HttpClient) { }

  addForum(forumData: any): Observable<any> {
    return this.http.post(this.url+"/new", forumData);
  }

}
