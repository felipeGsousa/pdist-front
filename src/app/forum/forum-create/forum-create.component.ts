import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/shared/service/forum.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.css']
})
export class ForumCreateComponent implements OnInit {

  forumData = {
    name: "",
    topic: "",
    description: "",
    banner: "",
    userId: ""
  };

  user: any = null;
  loggedIn: boolean = false;

  constructor(private forumService: ForumService, private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.forumData.banner = (reader.result as string).split(',')[1];
      };
      reader.onerror = (error) => {
        console.error('Erro ao converter imagem para Base64: ', error);
      };
    }
  }

  addForum() {
    this.forumData.userId = this.user.userId;
    this.forumService.addForum(this.forumData).subscribe(response => {
      console.log('Fórum criado com sucesso!', response);
    }, error => {
      console.error('Erro ao criar fórum:', error);
    });
  }
}
