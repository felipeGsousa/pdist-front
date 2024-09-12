import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ɵ_sanitizeUrl } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { error } from 'console';
import { FileDTO } from 'src/app/shared/model/fileDTO';
import { PostDTO } from 'src/app/shared/model/postDTO';
import { PostService } from 'src/app/shared/service/post.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: PostDTO[] = [];
  fileUrl: SafeUrl | undefined;
  filename: string = '';
  contentType: string = ''
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;
  loggedIn:boolean = false;


  constructor(private userService:UserService, private postService: PostService, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
    this.loadPosts();
    //this.loadFile();
  }

  loadPosts(): void {
    //this.postService.getAllPosts().subscribe(
    this.postService.getForumPosts().subscribe(
      (data: PostDTO[]) => {
        this.posts = data;
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
      }
      , 
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  sanitizeUrl(fileString: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(fileString);
  }

  /*loadFile(): void {
    this.postService.getFile().subscribe(
      (response: FileDTO) => {
        const byteCharacters = atob(response.data);  // Decodifica a string Base64
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: response.contentType });
        
        
        this.filename = response.filename;
        this.contentType = response.contentType;
        const url = URL.createObjectURL(blob);
        this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(url)
      },
      error => {
        console.error('Erro ao buscar o arquivo:', error);
      }
    );
  } */

  getPost(postId: string): void{
    this.postService.setPostId(postId);
    //this.pauseAllVideos;
    this.router.navigate(['/get-post/'+ postId]);
  }

  likePost(postId: string, type:string): void{
    if (this.loggedIn) {
      this.userService.likePost(postId, type).subscribe(
        (response: any) => {
          console.log(response);
        }, error => {
          console.error('Error: ', error);
        });
    }
  }

  private pauseAllVideos() {
    this.videoPlayers.forEach(videoPlayer => {
      const video: HTMLVideoElement = videoPlayer.nativeElement;
      if (!video.paused) {
        video.pause();
      }
    });
  }
}
