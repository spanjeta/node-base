/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsFreeModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsFreeModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [AuthService]
})
export class RegisterModule { }
