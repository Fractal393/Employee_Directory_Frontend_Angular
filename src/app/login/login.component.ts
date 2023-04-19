import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<boolean>();
  isLoggedIn = false;
  onClick() {
    this.isLoggedIn = !this.isLoggedIn;
    this.loggedIn.emit(this.isLoggedIn);
  }
}
