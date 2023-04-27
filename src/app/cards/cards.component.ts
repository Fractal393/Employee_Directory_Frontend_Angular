import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../employee.service';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  updateEmployeeForm: FormGroup;
  isEditing = false;
  @Input() employees!: IEmployee[];

  preferredName = [
    { name: 'First Name', value: 0 },
    { name: 'Last Name', value: 1 },
  ];

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private dataShareService: DataShareService
  ) {
    this.updateEmployeeForm = this.formBuilder.group({
      employeeId: [0],
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

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: IEmployee[]) => {
      this.employees = data;
    });
    this.dataShareService.employees.subscribe((data: IEmployee[]) => {
      this.employees = data;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleDelete(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employees = this.employees.filter(
        (employee) => employee.employeeId !== employeeId
      );
    });
  }

  handleUpdate(employeeId: number) {
    if (this.updateEmployeeForm.valid) {
      this.updateEmployeeForm.patchValue({ employeeId: employeeId });
      const updatedEmployee: IEmployee = this.updateEmployeeForm.value;
      this.employeeService
        .updateEmployee(updatedEmployee, employeeId)
        .subscribe((response: IEmployee) => {
          console.log(response);
        });
    }
  }
}
