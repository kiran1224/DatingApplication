import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //@Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
   model: any = {};
   public employees = [];
   registerForm: FormGroup;
   user: User;
   bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alerify: AlertifyService
    ,         private router: Router , private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    // this.authService.getdata()
    // .subscribe(a => this.employees = a);
    this.createRegisterForm();
  }


  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  //  register() {
  //    this.authService.register(this.model).subscribe(() => {
  //      debugger;
  //     this.alerify.success('registration successful');
  //    }, error => {
  //      this.alerify.error(error);
  //     });
  //  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alerify.success('Registration successful');
      }, error => {
        this.alerify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }



   cancel(){
    this.cancelRegister.emit(false);
  //  this.alerify.message('canceled');
   }

}
