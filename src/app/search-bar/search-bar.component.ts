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
  searchForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchBy: '',
      searchText: '',
    });

    this.addEmployeeForm = this.formBuilder.group({
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

  employees: IEmployee[] = [];
  searchBy: string = '';
  searchText: string = '';

  handleAddEmployee() {
    const newEmployee: IEmployee = this.addEmployeeForm.value;
    this.employeeService
      .addEmployees(newEmployee)
      .subscribe((response: IEmployee) => {
        console.log(response);
        this.employees.push(response);
      });
  }

  handleSearch() {
    this.employeeService
      .getBySearch(
        this.searchForm.value.searchText,
        this.searchForm.value.searchBy
      )
      .subscribe((data: IEmployee[]) => (this.employees = { ...data }));
  }

  onClear() {
    this.searchForm.value.searchText = ' awdawd';
  }
}
