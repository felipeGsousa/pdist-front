import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';



@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostEditComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostModule { }
