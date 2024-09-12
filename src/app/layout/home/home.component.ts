import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ForumCreateComponent } from 'src/app/forum/forum-create/forum-create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private route:ActivatedRoute) { }

  ngOnInit(): void {
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
