import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CommentDTO } from 'src/app/shared/model/commentDTO';
import { PostDTO } from 'src/app/shared/model/postDTO';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  postId: string = "";
  postDTO: PostDTO | undefined;
  commentDTO: CommentDTO | undefined;

  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.postService.getPostId();
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

}
