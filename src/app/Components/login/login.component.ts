import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Iuser } from '../../Models/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  _FormGroup: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {
    this._FormGroup = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  get email() {
    return this._FormGroup.get('email');
  }
  get password() {
    return this._FormGroup.get('password');
  }
  user: any[] = [];

  login() {
    if (this.email && this.password) {
      this._userService.getUser().subscribe({
        next: (data: any) => {
          this.user = data;
          let isExistingUser = this.user.find(
            (existing: any) => existing.email === this.email?.value
          );
          console.log(isExistingUser);
          if (isExistingUser) {
            if (
              isExistingUser.email === this.email?.value &&
              isExistingUser.password === this.password?.value
            ) {
              let loginUser = {
                email: isExistingUser.email,
                password: isExistingUser.password,
              };

              this._userService.login(loginUser).subscribe({
                next: () => {
                  this.router.navigate(['/products']);
                },
              });
            }
          } else {
            alert('invalid email or password');
          }
        },
      });
    }
  }
}
