import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../employee.service';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  updateEmployeeForm: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.updateEmployeeForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      preferredName: null,
      email: '',
      jobTitle: '',
      department: '',
      office: '',
      phoneNumber: '',
      skypeID: '',
      imagePath: '',
    });
  }

  employees!: Observable<IEmployee[]>;

  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleDelete(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe();
  }

  handleUpdate() {
    const updatedEmployee: IEmployee = this.updateEmployeeForm.value;
    this.employeeService
      .updateEmployee(updatedEmployee)
      .subscribe((response: IEmployee) => {
        console.log(response);
      });
  }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
}
