import { Component, OnInit} from '@angular/core';
import { PingService } from './shared/service/ping.service';
import { url } from 'inspector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'PDIST-FRONT';

  url1 = "https://pdist-user-service.onrender.com/api/ping";
  url2 = "https://pdist-back.onrender.com/api/ping";
  url3 = "https://pdist-file-service.onrender.com/api/ping";

  constructor(private keepAliveService: PingService) {}

  ngOnInit(): void {
    this.keepAliveService.startKeepAlive(60000, this.url1);
    this.keepAliveService.startKeepAlive(60000, this.url2);
    this.keepAliveService.startKeepAlive(60000, this.url3);
  }
}
