declare var google: any;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor() { }

  user: any;
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
        { theme: "outline", size: "large" }  // Personalize o botão
      );

      google.accounts.id.prompt(); // Opcionalmente exibe uma dica de login
    };
  }

  handleCredentialResponse(response: any) {
    // Decode o token JWT
    const userObject = this.parseJwt(response.credential);
    console.log(userObject);
    this.user = userObject;
    this.loggedIn = true;
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
    google.accounts.id.disableAutoSelect();
  }
}
