import { Component } from '@angular/core';
import { IEmployee } from '../employee.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  filteredEmployees: IEmployee[] = [];

  onSearchResults(employees: IEmployee[]) {
    this.filteredEmployees = employees;
  }
}
