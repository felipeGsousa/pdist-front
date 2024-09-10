declare var google: any;

import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: any = null;
  loggedIn: boolean = false;

  ngOnInit() {
    // Inicializar o cliente de autenticação do Google
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: '191868191902-gimo3fjquu6o2n11714micmb2iv0e4ot.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this)
      });

      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" , prompt_parent_id: "buttonDiv", prompt: "select_account" }  
      );

      google.accounts.id.prompt(); 
    };

    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();

  }

  handleCredentialResponse(response: any) {
    //const userObject = this.parseJwt(response.credential);
    //console.log(userObject);
    //this.user = userObject;
    //this.loggedIn = true;
    //this.http.post("https://pdist-user-service.onrender.com/api/auth/google", response.credential).subscribe(

    this.userService.login(response.credential).subscribe(  
      data => {
        this.user = data;
        this.loggedIn = true;
        this.userService.setUser(this.user, this.loggedIn);
        console.log(data);
        //redirect to home
      },
      error => {
        console.error("Authentication error", error);
      }
    );

  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout() {
    this.user = null;
    this.loggedIn = false;
    this.userService.clearUser();
    google.accounts.id.disableAutoSelect();
  }
}
