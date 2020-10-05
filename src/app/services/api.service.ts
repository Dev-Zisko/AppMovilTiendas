import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

export interface User {
  idcard: string,
  name: string,
  lastname: string,
  cellphone: string,
  email: string,
  password: string,
  repeatpassword: string,
  rol: string
}; // Object User

export interface Queue {
  idSubsidiary: any;
  nameSubsidiary: any;
  idQueue: any;
  puesto: any;
  latitud: any;
  longitud: any;
}; // Object Queue

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  CODE_PASS = 'nexuz_rapicola_159753258456-';

  constructor(private http: HttpClient, private env: EnvService) { }

  //REGISTER-MAIN-PROFILE API

  register(idcard, name, lastname, cellphone, email, password, address) {
    try {
      return this.http.post(this.env.API_URL + 'apiregister',
        { cedula: idcard, nombre: name, apellido: lastname, telefono: cellphone, 
          email: email, password: password, direccion: '', ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

  login(email, password) {
    try {
      return this.http.post(this.env.API_URL + 'apilogin',
        { email: email, password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    } 
  }

  searchUser(email){
    try {
      return this.http.post(this.env.API_URL + 'apisearch',
        { email: email, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

  editProfile(email, name, lastname, cellphone, password) {
    try {
      return this.http.post(this.env.API_URL + 'apiprofile',
        { email: email, nombre: name, apellido: lastname, telefono: cellphone, password: password, ticket: this.CODE_PASS }
      );
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

  //HOME

  getData(email) {
    try {
      return this.http.post(this.env.API_URL + 'apidata', { ticket: this.CODE_PASS, email: email});
    } catch (error) {
      alert("Error en la operación. Puede ser por problemas de conexión, intente más tarde.");
    }
  }

}
