import { Component, OnInit } from '@angular/core';
import { ForumDTO } from 'src/app/shared/model/forumDTO';
import { ForumService } from 'src/app/shared/service/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {

  forums: ForumDTO[] = [];

  constructor(private forumService: ForumService) { }

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
  
}
