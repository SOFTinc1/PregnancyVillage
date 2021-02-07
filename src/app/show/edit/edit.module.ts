import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { HeaderModule } from 'src/app/header/header.module';
import { FooterModule } from 'src/app/footer/footer.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';




@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditRoutingModule,
    HeaderModule,
    FooterModule,
    AngularMaterialModule
  ]
})
export class EditModule { }
