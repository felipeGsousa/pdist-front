import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { ForumListComponent } from './forum/forum-list/forum-list.component';
import { PostListComponent } from './post/post-list/post-list.component';

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
    path: 'post',
    component: PostCreateComponent,
  },
  {
    path: 'forums',
    component: ForumListComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
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
