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
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
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
  user:any ;

  login() {
    if (this.email && this.password) {

      this.user = {
        email: this.email.value,
        password: this.password.value
      };


      this._userService.login(this.user).subscribe({
        next: () => {
          this.router.navigate(['/products'])
        }

      });
    }
  }


}
