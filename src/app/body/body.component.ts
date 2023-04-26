import { Component, Input } from '@angular/core';
import { IEmployee } from '../employee.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  employees!: IEmployee[];
  @Input() appComponent!: AppComponent;

  onSearchResults(data: IEmployee[]): void {
    this.employees = data;
    console.log(this.employees);
  }

  handleLogout(): void {
    localStorage.removeItem('token');
    this.appComponent.onLoggedIn(false);
  }
}
