import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService, IUser } from '../employee.service';
import { AppComponent } from '../app.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm: FormGroup;
  //@Output() loggedIn = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;

  @Input() appComponent!: AppComponent;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.userForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
          ),
        ],
      ],
    });
  }

  handleRegister() {
    if (this.userForm.valid) {
      const user: IUser = this.userForm.value;
      this.employeeService.register(user).subscribe(
        (response) => {
          alert(response.message);
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Please enter a valid email and password');
    }
  }

  handleLogin() {
    if (this.userForm.valid) {
      const user: IUser = this.userForm.value;
      this.employeeService.login(user).subscribe((response) => {
        localStorage.setItem('token', response.token);
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
        this.appComponent.onLoggedIn(this.isLoggedIn);
      });
    }
  }

  // onClick() {
  //   this.isLoggedIn = !this.isLoggedIn;
  //   this.loggedIn.emit(this.isLoggedIn);
  // }
}
