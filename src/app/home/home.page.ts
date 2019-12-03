import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameValidator } from '../validator/username';
import { PasswordValidator } from '../validator/password';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  toast: Promise<void>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController
  ) { }

  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line: variable-name
  matching_passwords_group: FormGroup;
  genders: Array<string>;

  // tslint:disable-next-line:variable-name
  validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    lastname: [
      { type: 'required', message: 'Last name is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  ngOnInit() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.

    this.genders = [
      '',
      'Male',
      'Female'
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([ 
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
               Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z-.]+$')
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  onSubmit(values) {
    console.log(values);
    this.router.navigate(['/login']);
    this.toast = this.toastController.create({
      message: 'Registered Successfully',
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
}
