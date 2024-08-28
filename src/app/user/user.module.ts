import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFilesComponent } from './user-files/user-files.component';
import { UserForumsComponent } from './user-forums/user-forums.component';
import { UserDetailsComponent } from './user-details/user-details.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserFilesComponent,
    UserForumsComponent,
    UserDetailsComponent
  ],
  exports: [
    UserLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
