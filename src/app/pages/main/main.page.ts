import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  user: User = {
    idcard: '',
    name: '',
    lastname: '',
    cellphone: '',
    email: '',
    password: '',
    repeatpassword: '',
    rol: ''
  };

  email: string;

  constructor(private apiService: ApiService, 
    private toastCtrl: ToastController, private router: Router,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('email').then((val) => {
      this.email = val;
      if(this.email != "" && this.email != null){
        this.router.navigateByUrl('/home');
        this.showToast('Bienvenido a RapiCola!');
      }
    });
  }

  ionViewWillEnter() {
    this.storage.get('email').then((val) => {
      this.email = val;
      if(this.email != "" && this.email != null){
        this.router.navigateByUrl('/home');
        this.showToast('Bienvenido a RapiCola!');
      }
    });
  }

  login(){
    try {
      if(this.user.email == "" || this.user.password == "") {
        this.showToast('Rellene todos los campos, por favor.');
      }
      else if(this.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('Verifique si su correo es correcto.');
      }
      else if(this.user.password.length < 8){
        this.showToast('La contraseña debe contener mínimo 8 caracteres.');
      }
      else{
        this.apiService.login(this.user.email, this.user.password).subscribe(
          data => {
            if(data['respuesta'] == "true"){
              this.storage.set('email', this.user.email);
              this.router.navigateByUrl('/home');
              this.showToast('Bienvenido a RapiCola!');
            }
            else if(data['respuesta'] == "false") {
              this.showToast('Error al entrar. Verifique los datos e intente nuevamente.');
            }
          },
          error => {
            this.showToast("Error inesperado al loguearse. Por favor intente más tarde.");
          }
        );
      }
    }
    catch (error){
      this.showToast("Error inesperado al loguearse. Por favor intente más tarde.");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
