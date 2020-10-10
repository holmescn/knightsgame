import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from 'src/app/services/feathers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private feathers: FeathersService, private router: Router) { }

  ngOnInit() {
  }

  submit(form: any) {
    console.log(form);
    // this.feathers.service("users").create({
    //   email: '',
    //   password: '',
    // }).then((u: any) => {
    //   console.error(u);
    //   this.router.navigateByUrl('home');
    // }).catch((e: Error) => {
    //   console.error(e);
    // });
  }
}
