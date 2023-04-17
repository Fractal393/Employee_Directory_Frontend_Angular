import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../employee.service';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      employeeId: [, Validators.required],
      firstName: [''],
      lastName: [''],
      preferredName: [, Validators.required],
      email: [''],
      jobTitle: [''],
      department: [''],
      office: [''],
      phoneNumber: [''],
      skypeID: [''],
      imagePath: [''],
    });
    this.updateEmployeeForm.patchValue(this.employees);
  }

  @Input() employees!: Observable<IEmployee[]>;

  isEditing = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleDelete(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe();
  }

  handleUpdate(employeeId: number) {
    const updatedEmployee: IEmployee = this.updateEmployeeForm.value;
    this.employeeService
      .updateEmployee(updatedEmployee, employeeId)
      .subscribe((response: IEmployee) => {
        console.log(response);
      });
  }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
}
