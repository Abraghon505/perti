import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieService } from '../services/movies/movie.service';
import { MovieInfoPage } from '../modals/movie-info/movie-info.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  moviesList=[];

  constructor(
    private movieService: MovieService,
    private modalController: ModalController
  ) {}

  ngOnInit() {    
  }

  onSearchChange(event){
    this.moviesList = [];
    console.log(event);
    this.movieService.getMovies(event.detail.value).then((res) => {
      Object.entries(res).forEach(([key, value]) => {
        console.log(value);
        this.moviesList.push({
          id: value.show.id,
          name: value.show.name,
          lang: value.show.language,
          rat: value.show.rating.average,
          img: value.show.image ? value.show.image.medium : '',
        });
      });
      console.log(this.moviesList);
    });
  }


  async openDetail(id) {
    const modal = await this.modalController.create({
      component: MovieInfoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id
      }
    });
    return await modal.present();
  }
}
