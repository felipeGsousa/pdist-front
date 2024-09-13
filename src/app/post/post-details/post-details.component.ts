import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommentDTO } from 'src/app/shared/model/commentDTO';
import { PostDTO } from 'src/app/shared/model/postDTO';
import { CommentService } from 'src/app/shared/service/comment.service';
import { PostService } from 'src/app/shared/service/post.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  postId: string = "";
  postDTO: PostDTO | undefined;
  commentDTO = {
    userId: "",
    data: ""
  };
  commentDTOto = {
    userId: "",
    data: ""
  };
  private routeSub: Subscription | undefined;
  private user: any;
  private loggedIn: boolean = false;

  public showReplies: { [key: number]: boolean } = {};
  public replyComment: { [key: number]: boolean } = {};

  constructor(private route:ActivatedRoute, private userService: UserService,private postService: PostService, private sanitizer: DomSanitizer, private commentService:CommentService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
    this.routeSub = this.route.params.subscribe(params => {
      this.postService.setPostId(params['id']);
    })
    this.postService.getPost().subscribe(
      (response: PostDTO) => {
        this.postDTO = response;
        if (this.postDTO.file != undefined) {
            if (this.postDTO.file.data != null) {
            const byteCharacters = atob(this.postDTO.file?.data);
            const byteNumbers = new Array(byteCharacters.length)
    
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
    
            const blob = new Blob([byteArray], { type: this.postDTO.file.contentType });
            
            const url = URL.createObjectURL(blob);
            this.postDTO.fileType = this.postDTO.file.contentType;
            this.postDTO.fileUrl = this.sanitizeUrl(url);
            this.postDTO.fileName = this.postDTO.file.filename;

            this.postDTO.likeButtonColor = "secondary";
            this.postDTO.dislikeButtonColor = "secondary"

           
            if (this.loggedIn) {
              let exists = this.user.likedPosts[response.id];
              if (exists) {
                if (exists === "like") {
                  this.postDTO.likeButtonColor = "primary";
                  this.postDTO.dislikeButtonColor = "secondary";
                } else {
                  this.postDTO.likeButtonColor = "secondary";
                  this.postDTO.dislikeButtonColor = "primary";
                }
              }
            }
          };
        }
      }, error => {
        console.error('Error fetching post:', error);
      }
    );
  }
  sanitizeUrl(fileString: string): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(fileString);
  }

  addComment(event:any){
    if (event.keyCode === 13) {
      if (this.commentDTO.data.trim() === ""){
        alert("Empty comment");
        return;
      } 
      this.commentDTO.userId = this.userService.getUserId();
      this.commentService.addComment(this.postService.getPostId(), this.commentDTO).subscribe(response => {
        console.log('Comment creating succesfully:', response);
        window.location.reload();
      },error => {
        console.error('Error creating forum:', error);
      });  
    }
  }

  addCommentTo(event:any, commentId:string){
    if (this.loggedIn) {
      if (event.keyCode === 13) {
        console.log(this.commentDTOto)
        if (this.commentDTOto.data.trim() === ""){
          alert("Empty comment");
          return;
        } 
        this.commentDTOto.userId = this.userService.getUserId();
        this.commentService.addCommentTo(commentId, this.commentDTOto).subscribe(response => {
          console.log('Comment creating succesfully:', response);
          window.location.reload();
        },error => {
          console.error('Error creating forum:', error);
        });  
      }
    }
  }

  likePost(post:any ,postId: string, type:string): void{
    if (this.loggedIn) {
      this.userService.likePost(postId, type).subscribe(
        (response: any) => {
          if(response) {
            post.dislikes = response.dislikes;
            post.likes = response.likes;
          }
        }, error => {
          console.error('Error: ', error);
        });
    }
  }

  likeComment(comment:any, commentId: string, type:string): void {
    if (this.loggedIn) {
      this.userService.likeComment(commentId, type).subscribe(
        (response: any) => {
          if(response) {
            comment.dislikes = response.dislikes;
            comment.likes = response.likes;
          }
        }, error => {
          console.error('Error: ', error);
        });
    }
  }

  setCommentIconColor(comment: any) {
    comment.likeButtonColor = "secondary";
    comment.dislikeButtonColor = "secondary"
    if (this.loggedIn) {
      let exists = this.user.likedComments[comment.id];
      if (exists) {
        if (exists === "like") {
          comment.likeButtonColor = "primary";
          comment.dislikeButtonColor = "secondary";
        } else {
          comment.likeButtonColor = "secondary";
          comment.dislikeButtonColor = "primary";
        }
      }
    }
  }

  toggleReplySession(index: number): void {
    this.replyComment[index] = !this.replyComment[index];
  }

  toggleReplies(index: number): void {
    this.showReplies[index] = !this.showReplies[index];
  }
}
