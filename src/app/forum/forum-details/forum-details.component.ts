import { Component, OnInit } from '@angular/core';
import { error } from 'console';
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

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getForum().subscribe(
      (response: ForumDTO) => {
        this.forumDTO = response;
      }, error => {
        console.error('Error fetching forum', error);
      }
    )
  }
}
