import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private http: HttpClient) {}

  startKeepAlive(interval: number, url: string): void {
    timer(0, interval).pipe(
      switchMap(() => this.pingBackend(url))
    ).subscribe(response => {
      console.log('Ping ao backend executado com sucesso:', response);
    }, error => {
      console.error('Erro ao pingar o backend:', error);
    });
  }

  // Função que faz a requisição ao backend
  private pingBackend(url: string): Observable<any> {
    return this.http.get(url);
  }

}
