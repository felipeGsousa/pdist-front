import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  bannerName = "";

  topics = ["Educação","Sustentabilidade","Tecnologia",
    "Psicologia","Fotografia","Literatura","Economia",
    "Arquitetura","Música","Medicina",
    "Urbanismo","História","Moda","Design",
    "Astronomia","Cinema","Culinária",
    "Jornalismo","Esporte","Saúde"
  ]

  user: any = null;
  loggedIn: boolean = false;

  constructor(private router: Router, public dialogRef: MatDialogRef<ForumCreateComponent>, private forumService: ForumService, private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loggedIn = this.userService.isLoggedIn();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert('Por favor, selecione uma imagem.');
        return;
      }
    }
    
    if (file) {
      const reader = new FileReader();
      this.bannerName = file.name;
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
    this.forumData.userId = this.userService.getUserId();
    this.forumService.addForum(this.forumData).subscribe(response => {
      console.log('Forum creating succesfully:', response);
      this.forumService.setForumId(response.id);
      this.router.navigate(['/get-forum/'+response.id]);
      this.closeDialog(); 
    }, error => {
      console.error('Error creating forum:', error);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
