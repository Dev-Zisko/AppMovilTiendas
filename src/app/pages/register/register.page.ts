import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

  constructor(private apiService: ApiService, 
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  register(){
    try {
      if(this.user.idcard == "" || this.user.name == "" || this.user.lastname == "" || 
      this.user.cellphone == "" || this.user.email == "" || this.user.password == "" || 
      this.user.repeatpassword == ""){
        this.showToast('Rellene todos los campos, por favor.');
      }
      else if(this.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('Verifique si su correo es correcto.');
      }
      else if(this.user.password != this.user.repeatpassword){
        this.showToast('Ambas contraseñas deben coincidir.');
      }
      else if(this.user.password.length < 8){
        this.showToast('La contraseña debe contener mínimo 8 caracteres.');
      }
      else{
        this.apiService.register(this.user.idcard, this.user.name, this.user.lastname, 
          this.user.cellphone, this.user.email, this.user.password, '').subscribe(
          data => {
            if(data["respuesta"] == "true"){
              this.router.navigateByUrl('/main');
              this.showToast('Usuario registrado correctamente.');
            }
            else if(data["respuesta"] == "false"){
              this.showToast('Error al registrar. Este usuario ya existe, verifique los datos e intente nuevamente.');
            }
          },
          error => {
            this.showToast("Error inesperado al registrarse. Por favor intente más tarde.");
          }
        );
      } 
    } 
    catch (error){
      this.showToast("Error inesperado al registrarse. Por favor intente más tarde.");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
