import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { error } from 'console';
import { FileDTO } from 'src/app/shared/model/fileDTO';
import { PostDTO } from 'src/app/shared/model/postDTO';
import { PostService } from 'src/app/shared/service/post.service';

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

  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadFile();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data: PostDTO[]) => {
        this.posts = data;
      }, 
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  loadFile(): void {
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
  } 
}
