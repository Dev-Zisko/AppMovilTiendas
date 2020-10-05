import { Component, OnInit } from '@angular/core';
import { ApiService,  User } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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

  email = "jfelmejor@gmail.com";

  constructor(private apiService: ApiService, 
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
    this.searchUser();
  }

  searchUser(){
    try{
      this.apiService.searchUser(this.email).subscribe(
        data => {
          if(data['respuesta'] == 'false'){
            this.showToast("Error inesperado al ver su perfil. Por favor intente más tarde.");
          }
          else{
            this.user.idcard = data['customer'].cedula;
            this.user.name = data['customer'].nombre;
            this.user.lastname = data['customer'].apellido;
            this.user.cellphone = data['customer'].telefono;
            this.user.email = data['customer'].email;
          }
        },
        error => {
          this.showToast("Error inesperado al editar perfil. Por favor intente más tarde.");
        }
      );
    }
    catch (error){
      this.showToast("Error inesperado al ver su perfil. Por favor intente más tarde.");
    }
  }

  editProfile(){
    try{
      if(this.user.name == "" || this.user.lastname == "" || this.user.cellphone == ""){
        this.showToast('Rellene todos los campos, por favor.');
      }
      else{
        if(this.user.password == "" && this.user.repeatpassword == ""){
          this.apiService.editProfile(this.user.email, this.user.name, this.user.lastname, this.user.cellphone, 
            '').subscribe(
            data => {
              if(data['respuesta'] == 'true'){
                this.router.navigateByUrl('/home');
                this.showToast('Su perfil fue actualizado correctamente.');
              }
              else{
                this.showToast("Error inesperado al editar perfil. Por favor intente más tarde.");
              }
            },
            error => {
              this.showToast("Error inesperado al editar perfil. Por favor intente más tarde.");
            }
          );
        }
        else if(this.user.password != "" || this.user.repeatpassword != ""){
          if(this.user.password != this.user.repeatpassword){
            this.showToast('Ambas contraseñas deben coincidir.');
          }
          else if(this.user.password.length < 8){
            this.showToast('La contraseña debe contener mínimo 8 caracteres.');
          }
          else{
            this.apiService.editProfile(this.user.email, this.user.name, this.user.lastname, this.user.cellphone, 
              this.user.password).subscribe(
              data => {
                if(data['respuesta'] == 'true'){
                  this.router.navigateByUrl('/home');
                  this.showToast('Su perfil fue actualizado correctamente.');
                }
                else{
                  this.showToast("Error inesperado al editar perfil. Por favor intente más tarde.");
                }
              },
              error => {
                this.showToast("Error inesperado al editar perfil. Por favor intente más tarde.");
              }
            );
          }
        }     
      }
    }
    catch (error){
      this.showToast("Error inesperado al ver su perfil. Por favor intente más tarde.");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
