import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from 'src/app/services/feathers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private feathers: FeathersService,
              private router: Router) { }

  async submit(form: any) {
    try {
      const user = await this.feathers.login({
        strategy: 'local',
        email: form.value.email,
        password: form.value.password
      });
      console.log(user);
      this.router.navigateByUrl('home');
    } catch (err) {
      console.log(err);
    }
  }
}