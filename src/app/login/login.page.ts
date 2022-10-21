import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  pass: any;
  constructor(
    private localNotifications: LocalNotifications,
    private router: Router,
    private toastController: ToastController,

    ) { }

  ngOnInit() {
  }

  login(){
    if(this.user == undefined || this.pass == undefined){
      this.showErrorMessage();
    }else{
      this.showSuccessMessage();
    }
  }

  showErrorMessage(){
    this.presentToast('Acceso Incorrecto!', 'danger');
    this.localNotifications.schedule({
      text: 'Intento de Acceso Incorrecto',
      data: {secret: 'secret'}
    });
  }

  showSuccessMessage() {

    if(this.user == localStorage.getItem('user') && this.pass == localStorage.getItem('pass')){
      
      this.localNotifications.schedule({
        text: 'Intento de Acceso Exitoso',
        data: {secret: 'secret'}
      });

      this.presentToast('Acceso Correcto!', 'success').then(() => {
        this.router.navigateByUrl('/home');
      });
    }else{
      this.presentToast('Acceso Incorrecto!', 'danger');
      this.showErrorMessage();
    }
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

}
