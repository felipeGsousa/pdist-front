import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ForumCreateComponent } from 'src/app/forum/forum-create/forum-create.component';
import { PostService } from 'src/app/shared/service/post.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private route:ActivatedRoute, private userService:UserService, private postService: PostService) { }

  posts: any[] = [];
  loggedIn:boolean = false;
  user: any;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
    this.loadRecentPosts();
  }

  createForum(): void {
    const dialogRef = this.dialog.open(ForumCreateComponent, {
      width: '700px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  loadRecentPosts(): void {
    this.postService.getRecentPosts(this.userService.getUserId()).subscribe((response: any) => {
      this.posts = response.data.getRecentPosts;
      this.posts.forEach( post => {
        if (post.file != undefined) {
          if (post.file.data != null) {
            const byteCharacters = atob(post.file?.data);
            const byteNumbers = new Array(byteCharacters.length)
    
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
    
            const blob = new Blob([byteArray], { type: post.file.contentType });
            
            const url = URL.createObjectURL(blob);
            post.fileType = post.file.contentType;
            post.fileUrl = this.sanitizeUrl(url);
            post.fileName = post.file.filename;
            
          }
        }
      })
    }, (error) => {
      console.error('Error fetching posts:', error);
    });
  }

  sanitizeUrl(fileString: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(fileString);
  }
}
