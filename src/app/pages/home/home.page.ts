import { Component, OnInit } from '@angular/core';
import { ApiService,  User, Queue } from './../../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EnvService } from './../../services/env.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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

  queue: Queue = {
    idSubsidiary: '',
    nameSubsidiary: '',
    idQueue: '',
    puesto: '',
    latitud: '',
    longitud: ''
  };

  public subsidiaries: string[] = [];
  public business: any;
  public queues: any;
  public pharmacies: string[] = [];
  public items: string[] = [];
  public storageUri = this.env.API_STORAGE;

  email = "jfelmejor@gmail.com";

  constructor(private apiService: ApiService, 
    private toastCtrl: ToastController, private router: Router, 
    private env: EnvService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    try {
      this.apiService.getData(this.email).subscribe(
        data => {
          if (data['respuesta'] === 'false') {
            this.showToast("Error inesperado al cargar la información. Por favor intente más tarde.");
          } else {
            this.subsidiaries = data['subsidiaries'];
            this.business = data['business'];
            this.queues = data['queues'];
            //setTimeout(() => {
              this.pharmacies = [];
              this.business.forEach(element => {
                this.pharmacies.push(element.nombre);
              });
            //}, 5000);
            //setTimeout(() => {
              this.items = [];
              this.subsidiaries.forEach(element => {
                this.items.push(element);
              });
            //}, 5000);
          }
        },
        error => {
          this.showToast("Error inesperado al cargar la información. Por favor intente más tarde.");
        }
      );
    } catch (error) {
      this.showToast("Error inesperado al cargar la información. Por favor intente más tarde.");
    }
  }

  infoQueue(id, nombre, latitud, longitud) {
    try {      
      this.queues.forEach(element => {
        if (element.id_subsidiary === id) {
          this.queue.idQueue = element.id;
        }
      });
      this.queue.idSubsidiary = id;
      this.queue.nameSubsidiary = nombre;
      this.queue.latitud = latitud;
      this.queue.longitud = longitud; 
      this.router.navigateByUrl('/rapicola');
    } catch (error) {
      this.showToast("Error inesperado, por favor intente nuevamente.");
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
