import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Employee_Angular';
  isLoggedIn = false;

  onLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }
}
