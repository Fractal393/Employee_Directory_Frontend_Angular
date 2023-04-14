import { Component } from '@angular/core';
import { alphabets } from '../model';
import { Observable } from 'rxjs';
import { EmployeeService, IEmployee } from '../employee.service';
@Component({
  selector: 'app-letter-boxes',
  templateUrl: './letter-boxes.component.html',
  styleUrls: ['./letter-boxes.component.css'],
})
export class LetterBoxesComponent {
  constructor(private employeeService: EmployeeService) {}
  alphabets = [...alphabets];

  employees!: IEmployee[];

  onClick(alphabet: string) {
    this.employeeService
      .getByAlphabet(alphabet)
      .subscribe((data: IEmployee[]) => (this.employees = { ...data }));

    console.log(this.employees);
  }
}
