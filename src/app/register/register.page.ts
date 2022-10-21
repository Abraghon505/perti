import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  first: String;
  last: String;
  date: any;
  user: any;
  password: any;
  constructor(
    private usersService: UserService,
    private toastController: ToastController,
    private router: Router,
    private localNotifications: LocalNotifications,
    ) { }

  ngOnInit() {
    this.usersService.getRandomUserInfo().then((user) => {
      this.first = user['results'][0].name.first;
      this.last = user['results'][0].name.last;
      this.date = user['results'][0].registered.date;
    });
  }

  register(){
    if (this.user == undefined){
      this.presentToast('Ingresar Usuario', 'danger');
      return false;
    }
    if (this.password == undefined){
      this.presentToast('Ingresar Contraseña', 'danger');
      return false;
    }

    localStorage.setItem('user', this.user);
    localStorage.setItem('pass', this.password);

    this.presentToast('Registro exitoso', 'success').then(() => {
      this.router.navigateByUrl('/login')
    });
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color
    });

    await toast.present();
  }


  showSuccessMessage() {      
    this.localNotifications.schedule({
      text: 'Registro Exitoso',
      data: {secret: 'secret'}
    });    
  }
  

}
