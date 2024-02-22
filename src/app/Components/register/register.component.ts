import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Iuser } from '../../Models/iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  _FormGroup: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {
    this._FormGroup = this._formBuilder.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      phoneNumber: this._formBuilder.array([
        new FormGroup({
          phoneNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(/^01[0125][0-9]{8}$/),
          ]),
        }),
      ]),

      address: this._formBuilder.array([
        new FormGroup({
          city: new FormControl('', [Validators.required]),
          street: new FormControl('', [Validators.required]),
          postalCode: new FormControl('', [Validators.required]),
        }),
      ]),
    });
  }

  get fullName() {
    return this._FormGroup.get('fullName');
  }
  get password() {
    return this._FormGroup.get('password');
  }
  get email() {
    return this._FormGroup.get('email');
  }

  get phoneNumber() {
    return this._FormGroup.get('phoneNumber') as FormArray;
  }

  newPhoneNumber() {
    return this._formBuilder.group({
      phoneNumber: '',
    });
  }
  addNewPhoneNumber() {
    this.phoneNumber.push(this.newPhoneNumber());
  }
  removePhoneNumberInput(currentIndex: number) {
    this.phoneNumber.removeAt(currentIndex);
  }
  get address() {
    return this._FormGroup.get('address') as FormArray;
  }
  newAddress() {
    return this._formBuilder.group({
      city: '',
      street: '',
      postalCode: '',
    });
  }
  addNewAddress() {
    return this.address.push(this.newAddress());
  }
  removeAddressInput(currentIndex: number) {
    this.address.removeAt(currentIndex);
  }
  user: Iuser = {} as Iuser;
  signUp() {
    this.user.fullName = this.fullName?.value;
    this.user.email = this.email?.value;
    this.user.password = this.password?.value;
    this.user.mobileNumber = this.phoneNumber?.value.map(
      (item: any) => item.phoneNumber
    );
    this.user.address = this.address?.value.map(
      (item: any) => `${item.street}, ${item.city}`
    );

    this._userService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
  ngOnInit(): void {}
}
