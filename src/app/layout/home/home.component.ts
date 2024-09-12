import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ForumCreateComponent } from 'src/app/forum/forum-create/forum-create.component';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private route:ActivatedRoute, private userService:UserService) { }

  loggedIn:boolean = false;

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
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

}
