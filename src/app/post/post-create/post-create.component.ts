import { Component, OnInit } from '@angular/core';
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
    file: "",
  }

  user: any = null;
  loggedIn: boolean = false;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.postData.file = reader.result as string; 
      };

      reader.readAsDataURL(file);
    }
  }

  addPost() {
    this.postService.addPost("66cb977bc6c07d454ba3c536", this.postData).subscribe(response => {
      console.log('Post created successfully:', response);
    }, error => {
      console.error('Error creating post:', error);
    });
  }
}
