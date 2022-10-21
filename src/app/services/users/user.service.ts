import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://randomuser.me/api";

  constructor( private httpClient: HttpClient ) { }

  async getRandomUserInfo(){
    let data = await this.httpClient.get(this.url).toPromise();
    return data;
  }

  
}
