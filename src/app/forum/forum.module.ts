import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumCreateComponent } from './forum-create/forum-create.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumEditComponent } from './forum-edit/forum-edit.component';
import { ForumDetailsComponent } from './forum-details/forum-details.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { PostListComponent } from '../post/post-list/post-list.component';
import { PostModule } from '../post/post.module';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ForumCreateComponent,
    ForumListComponent,
    ForumEditComponent,
    ForumDetailsComponent
  ],
  exports: [
    ForumCreateComponent,
    ForumListComponent,
    ForumDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    PostModule,
  ]
})
export class ForumModule { }
