import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../employee.service';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  employees!: Observable<IEmployee[]>;

  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleDelete(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe();
  }
  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
}
