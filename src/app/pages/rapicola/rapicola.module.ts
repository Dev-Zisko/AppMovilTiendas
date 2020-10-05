import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RapicolaPageRoutingModule } from './rapicola-routing.module';

import { RapicolaPage } from './rapicola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RapicolaPageRoutingModule
  ],
  declarations: [RapicolaPage]
})
export class RapicolaPageModule {}
