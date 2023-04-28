import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../../Models/Users/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('Token') != undefined) {
      this.router.navigate(['/view-product']);
    }
  }
  error: string = '';
  Login() {
    var user: User = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.userService.Login(user).subscribe((res) => {
      if (res.status) {
        localStorage.setItem('Token', res.data.token);
        this.router.navigate(['/view-product']);
      } else {
        this.error = res.message;
      }
    });
  }
}
