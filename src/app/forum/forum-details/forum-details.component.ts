import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { PostCreateComponent } from 'src/app/post/post-create/post-create.component';
import { ForumDTO } from 'src/app/shared/model/forumDTO';
import { ForumService } from 'src/app/shared/service/forum.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.css'],
})
export class ForumDetailsComponent implements OnInit {

  forumId: string = "";
  forumDTO: ForumDTO | undefined;
  forumBanner: SafeUrl | undefined;
  userIn: boolean = false;
  private routeSub: Subscription | undefined;
  loggedIn:boolean = false;

  constructor(private userService:UserService, private forumService: ForumService, private sanitizer: DomSanitizer, public dialog: MatDialog, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();

    this.routeSub = this.route.params.subscribe(params => {
      this.forumService.setForumId(params['id']);
    })
    this.forumService.getForum().subscribe(
      (response: ForumDTO) => {
        this.forumDTO = response;
        if (response.banner != null) {
          const byteCharacters = atob(response.banner);
          const byteNumbers = new Array(byteCharacters.length)
        
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
        
          const blob = new Blob([byteArray], { type: "image/png" });
      
          const url = URL.createObjectURL(blob);
          this.forumBanner = this.sanitizeUrl(url);
        }
      }, error => {
        console.error('Error fetching forum', error);
      }
    )
    if (this.loggedIn) {
      const user = this.userService.getUser();
      if (this.forumDTO?.users.find(user.id)) {
        console.log(true);
      }
    }
  }

  createPost(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '500px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  sanitizeUrl(fileString: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(fileString);
  }
}
