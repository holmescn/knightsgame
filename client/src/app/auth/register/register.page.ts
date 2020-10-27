import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FeathersService } from 'src/app/services/feathers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  themeIcon: string;
  themeText: string;
  confirmed = false;
  constructor(private feathers: FeathersService, private toast: ToastController, private router: Router) { }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    this.updateTheme(theme);
  }

  updateTheme(theme: string) {
    if (theme === 'dark') {
      this.themeIcon = 'sunny-outline';
      this.themeText = '白天模式';
      document.body.classList.add('dark');
    } else {
      this.themeIcon = 'moon-outline'
      this.themeText = '夜间模式';
      document.body.classList.remove('dark');
    }
  }

  changeTheme(event: Event) {
    const theme = this.themeIcon === 'sunny-outline' ? 'light' : 'dark';
    this.updateTheme(theme);
    localStorage.setItem('theme', theme);
  }

  confirmPasswordChanged(form: NgForm) {
    this.confirmed = form.value.password === form.value.confirm;
  }

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