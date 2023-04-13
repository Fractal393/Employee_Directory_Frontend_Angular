import { Component } from '@angular/core';
import { EmployeeService, IEmployee } from '../employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  addEmployeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      preferredName: null,
      email: '',
      jobTitle: '',
      department: '',
      // iamgePath: '',
      office: '',
      phoneNumber: '',
      skypeID: '',
      imagePath: '',
    });
  }

  employees: IEmployee[] = [];

  handleAddEmployee() {
    const newEmployee: IEmployee = this.addEmployeeForm.value;
    this.employeeService
      .addEmployees(newEmployee)
      .subscribe((response: IEmployee) => {
        console.log(response);
        this.employees.push(response);
      });
  }
}
