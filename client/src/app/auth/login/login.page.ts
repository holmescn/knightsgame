import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from 'src/app/services/feathers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private feathers: FeathersService, private router: Router) { }

  ngOnInit() {
  }

  submit(form: any) {
    console.log(form);
    this.feathers.login({
      email: '',
      password: ''
    }).then((u: any) => {
      console.log(u);
      this.router.navigateByUrl('home');
    }).catch((e: Error) => {
      console.error(e);
    })
  }
}
