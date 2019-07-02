/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.loginForm.controls; }

  /**
   * function to submit login form.
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.authService.login(this.loginForm.value)
        .then(data => {
          if (data["errorCode"] === 0) {
            localStorage.setItem('token', data["token"]);
            this.router.navigate(['/home'])
          } else {
            this.notifier.notify('error', data["message"]);
          }
        }).catch(err => {
          this.notifier.notify('error', JSON.stringify(err));
        })
    }
  }

  ngOnInit() {
  }

}
