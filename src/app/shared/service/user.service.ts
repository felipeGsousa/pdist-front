import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = "https://pdist-user-service.onrender.com/api/auth/google";
  private userUrl = "https://pdist-user-service.onrender.com/api/user/";
  user: any = null;
  loggedIn: boolean = false;
  like = {
    "": "",
  };

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    const storedLoggedIn = localStorage.getItem('loggedIn');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.loggedIn = storedLoggedIn === 'true';
  }
  
  login(credential: string): Observable<any> {
    return this.http.post(this.authUrl, credential);
  }

  setUser(user: any, loggedIn: boolean) {
    this.user = user;
    this.loggedIn = loggedIn;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true'); 
  }

  likePost(postId:string, type:string){
    if (this.user.likedPosts.length > 0) {
      let exists = this.user.likedPosts.find((val: any) => val[0] === postId);
      if (exists) {
        if (exists[1]===type) {
          this.user.likedPosts.removeItem(exists);
        } else {
          this.user.likedPosts.removeItem(exists);
          this.user.likedPosts.insert({postId, type});
        }
      }
    }
    return this.http.post(this.authUrl + `post/${this.getUserId()}`, {postId, type});
  }

  likeComment(){}

  getUserId() {
    return this.user.id
    //return "66df940bd5efe7577f1c5c15"
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  clearUser() {
    this.user = null;
    this.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', 'false'); 
  }
}
