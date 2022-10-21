import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MovieService {  
  url = "https://api.tvmaze.com/search/shows";

  constructor( private httpClient: HttpClient ) { }

  async getMovies(search){
    let data = await this.httpClient.get(`${this.url}?q=${search}`).toPromise();
    return data;
  }

  async getMovieDetail(show){
    let data = await this.httpClient.get(`https://api.tvmaze.com/shows/${show}`).toPromise();
    return data;
  }
}
