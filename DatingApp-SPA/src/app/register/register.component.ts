import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


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

  constructor(private authService: AuthService, private alerify: AlertifyService ) { }

  ngOnInit() {
    this.authService.getdata()
    .subscribe(a => this.employees = a);
  }

   register() {
     this.authService.register(this.model).subscribe(() => {
       debugger;
      this.alerify.success('registration successful');
     }, error => {
       this.alerify.error(error);
      });
   }

   cancel(){
    this.cancelRegister.emit(false);
  //  this.alerify.message('canceled');
   }

}
