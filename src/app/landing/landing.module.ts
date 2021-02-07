import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    HeaderModule,
    FooterModule,
    CarouselModule,
    AngularMaterialModule
  ]
})
export class LandingModule { }
