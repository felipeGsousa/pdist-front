import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumCreateComponent } from './forum-create/forum-create.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumEditComponent } from './forum-edit/forum-edit.component';
import { ForumDetailsComponent } from './forum-details/forum-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ForumCreateComponent,
    ForumListComponent,
    ForumEditComponent,
    ForumDetailsComponent
  ],
  exports: [
    ForumCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ForumModule { }
