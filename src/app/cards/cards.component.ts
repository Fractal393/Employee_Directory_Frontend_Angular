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

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e: any) => {
      const base64String =
        'data:image/*;base64,' + e.target.result.split(',')[1];
      this.updateEmployeeForm.patchValue({
        imagePath: base64String,
      });
    };
    reader.readAsDataURL(file);
  }

  handleUpdate(employee: IEmployee) {
    if (this.updateEmployeeForm.valid) {
      this.updateEmployeeForm.patchValue({ employeeId: employee.employeeId });
      const updatedEmployee: IEmployee = this.updateEmployeeForm.value;
      this.employeeService
        .updateEmployee(updatedEmployee, employee.employeeId)
        .subscribe(() => {
          this.employeeService
            .getEmployees()
            .subscribe((response: IEmployee[]) => {
              this.employees = response;
            });
        });
      this.updateEmployeeForm.reset();
    }
  }
}
