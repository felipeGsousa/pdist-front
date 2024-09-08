import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumDTO } from 'src/app/shared/model/forumDTO';
import { ForumService } from 'src/app/shared/service/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {

  forums: ForumDTO[] = [];

  constructor(private forumService: ForumService,  private router: Router) { }

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.forumService.getAllForums().subscribe(
      (data: ForumDTO[]) => {
        this.forums = data;
      },
      error => {
        console.error('Error fetching forums:', error);
      }
    );
  }

  getForum(postId: string): void{
    this.forumService.setForumId(postId);
    this.router.navigate(['/get-forum']);
  }
}
