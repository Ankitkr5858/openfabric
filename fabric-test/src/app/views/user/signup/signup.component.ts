import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Users/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  error: string = '';
  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('Token') != undefined) {
      this.router.navigate(['/view-product']);
    }
  }
  SignUp() {
    if (
      this.signupForm.value.password == this.signupForm.value.confirmPassword
    ) {
      var user: User = {
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
      };

      this.userService.SignUp(user).subscribe((res) => {
        if (res.status) {
          localStorage.setItem('Token', res.data.token);
          this.router.navigate(['/view-product']);
        } else {
          this.error = res.message;
        }
      });
    }
  }
}
