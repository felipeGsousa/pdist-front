import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { PostCreateComponent } from 'src/app/post/post-create/post-create.component';
import { ForumDTO } from 'src/app/shared/model/forumDTO';
import { ForumService } from 'src/app/shared/service/forum.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css']
})
export class ForumDetailsComponent implements OnInit {

  forumId: string = "";
  forumDTO: ForumDTO | undefined;

  constructor(private forumService: ForumService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.forumService.getForum().subscribe(
      (response: ForumDTO) => {
        this.forumDTO = response;
      }, error => {
        console.error('Error fetching forum', error);
      }
    )
  }

  createPost(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '400px', 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado');
      console.log('Resultado:', result);
    });
  }
}
