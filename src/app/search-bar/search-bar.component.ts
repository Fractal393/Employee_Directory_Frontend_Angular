import { Component, OnInit } from '@angular/core';
import { EmployeeService, IEmployee } from '../employee.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
      preferredName: [, Validators.required],
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

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e: any) => {
      const base64String =
        'data:image/*;base64,' + e.target.result.split(',')[1];
      this.addEmployeeForm.patchValue({
        imagePath: base64String,
      });
    };
    reader.readAsDataURL(file);
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
    console.log(this.searchForm.value.searchText);
    this.searchForm.value.searchText = '';
  }
}
