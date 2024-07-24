import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFilesComponent } from './user-files/user-files.component';
import { UserForumsComponent } from './user-forums/user-forums.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserFilesComponent,
    UserForumsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
