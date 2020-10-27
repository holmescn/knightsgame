import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from 'src/app/services/feathers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  themeIcon: string;
  themeText: string;
  constructor(private feathers: FeathersService,
              private router: Router) { }

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