import { Component } from '@angular/core';
import { NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FeathersService } from 'src/app/services/feathers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(private feathers: FeathersService, private toast: ToastController, private router: Router) { }

  async submit(form: NgForm) {
    if (form.value.confirm !== form.value.password) {
      const toast = await this.toast.create({
        message: 'Confirm password does not match.',
        duration: 2000
      });
      toast.present();

      return;
    }

    try {
      const created = await this.feathers.service('users').create({
        email: form.value.email,
        password: form.value.password
      });
      const user = await this.feathers.login({
        strategy: 'local',
        email: form.value.email,
        password: form.value.password
      });
      console.info(created, user);
      this.router.navigateByUrl('home');
    } catch (err) {
      console.log(err);
    }
  }
}