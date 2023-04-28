import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService, IEmployee } from '../employee.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  addEmployeeForm: FormGroup;
  searchForm: FormGroup;

  @Input() bodyComponent!: BodyComponent;

  preferredName = [
    { name: 'First Name', value: 0 },
    { name: 'Last Name', value: 1 },
  ];

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchBy: [''],
      searchText: [''],
    });

    this.addEmployeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      preferredName: [0],
      email: ['', [Validators.email]],
      jobTitle: [''],
      department: [''],
      office: [''],
      phoneNumber: [
        '',
        [Validators.pattern(/^\d+$/), Validators.maxLength(10)],
      ],
      skypeID: [''],
      imagePath: [''],
    });
  }

  employees: IEmployee[] = [];

  handleAddEmployee() {
    if (this.addEmployeeForm.valid) {
      const newEmployee: IEmployee = this.addEmployeeForm.value;
      this.employeeService.addEmployees(newEmployee).subscribe(() => {
        this.employeeService
          .getEmployees()
          .subscribe((response: IEmployee[]) => {
            this.bodyComponent.onSearchResults(response);
          });
      });
      this.addEmployeeForm.reset();
    }
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
      .subscribe((data: IEmployee[]) =>
        this.bodyComponent.onSearchResults(data)
      );
  }

  onClear() {
    this.searchForm.reset();
  }
}
