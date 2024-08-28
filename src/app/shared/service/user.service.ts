import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = "https://pdist-user-service.onrender.com/api/auth/google";
  user: any;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }
  
  login(credential: string): Observable<any> {
    return this.http.post(this.authUrl, credential);
  }

  setUser(user: any, loggedIn: boolean) {
    this.user = user;
    this.loggedIn = loggedIn;
  }

  getUser() {
    return this.user;
  }
}
