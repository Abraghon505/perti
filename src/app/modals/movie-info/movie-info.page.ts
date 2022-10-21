import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movies/movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.page.html',
  styleUrls: ['./movie-info.page.scss'],
})
export class MovieInfoPage implements OnInit {

  @Input() id: number;
  movieInfo: any;
  constructor(
    private modalCtrl: ModalController,
    private movieService: MovieService
    ) { }

  ngOnInit() {
    console.log(this.id);
    this.movieService.getMovieDetail(this.id).then((res) => {
      this.movieInfo = res;
    })
  }

  closeDetail(){
    this.modalCtrl.dismiss();
  }

}
