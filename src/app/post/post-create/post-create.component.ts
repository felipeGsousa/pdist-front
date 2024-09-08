import { Component, OnInit } from '@angular/core';
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

  constructor(private postService: PostService, private userService: UserService, private forumService: ForumService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
    this.postData.file = this.file;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if (file) {
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
    console.log(localStorage.getItem('forumId'));
    let forumId = localStorage.getItem('forumId');
    this.postData.userId = this.user.id;
    if (forumId != null){
      this.postService.addPost(forumId, this.postData).subscribe(response => {
        console.log('Post created successfully:', response);
      }, error => {
        console.error('Error creating post:', error);
      });
    }
  }
}
