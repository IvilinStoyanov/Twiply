import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  register() {
  //  this.authService.register(this.model).subscribe(() => {
  //    console.log('registration ok');
  //  }, error => {
  //    console.log(error);
  //  });
  console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }

}
