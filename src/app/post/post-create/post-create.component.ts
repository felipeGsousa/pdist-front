import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FileDTO } from 'src/app/shared/model/fileDTO';
import { ForumService } from 'src/app/shared/service/forum.service';
import { PostService } from 'src/app/shared/service/post.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postData = {
    title: "",
    content: "",
    userId: "",
    fileId: "",
    file: {},
  }
  
  file: any = {
    userId: "",
    data:"",
    contentType: "",
    filename:""
  };

  user: any = null;
  loggedIn: boolean = false;

  maxFileSize: number = 1 * 1024 * 1024;

  constructor(private router: Router, public dialogRef: MatDialogRef<PostCreateComponent>,private postService: PostService, private userService: UserService, private forumService: ForumService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
    this.postData.file = this.file;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        alert('O arquivo excede o limite de 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file.filename = file.name;
        this.file.contentType = file.type;
        this.file.data = (reader.result as string).split(',')[1]; 
        this.postData.file = this.file;
      };
    } else {
      this.postData.file = this.file;
    }
  }

  addPost() {
    let forumId = localStorage.getItem('forumId');
    this.postData.userId = this.userService.getUserId();
    if (forumId != null){
      this.postService.addPost(forumId, this.postData).subscribe(response => {
        console.log('Post created successfully:', response);
        this.postService.setPostId(response);
        this.router.navigate(['/get-post/'+response]);
        this.closeDialog(); 
      }, error => {
        console.error('Error creating post:', error);
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
