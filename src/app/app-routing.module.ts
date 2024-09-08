import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { ForumListComponent } from './forum/forum-list/forum-list.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { ForumDetailsComponent } from './forum/forum-details/forum-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'create-forum',
    component: ForumCreateComponent,
  },
  {
    path: 'create-post',
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
    path: 'get-post',
    component: PostDetailsComponent,
  },
  {
    path: 'get-forum',
    component: ForumDetailsComponent,
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
