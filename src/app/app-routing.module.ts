import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'forum',
    component: ForumCreateComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
