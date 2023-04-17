import { Component, EventEmitter, Output } from '@angular/core';
import { alphabets } from '../model';
import { EmployeeService, IEmployee } from '../employee.service';
@Component({
  selector: 'app-letter-boxes',
  templateUrl: './letter-boxes.component.html',
  styleUrls: ['./letter-boxes.component.css'],
})
export class LetterBoxesComponent {
  constructor(private employeeService: EmployeeService) {}

  @Output() searchResults = new EventEmitter<IEmployee[]>();

  alphabets = [...alphabets];

  employees!: IEmployee[];

  onClick(alphabet: string) {
    this.employeeService
      .getByAlphabet(alphabet)
      .subscribe((data: IEmployee[]) => (this.employees = { ...data }));
    this.searchResults.emit(this.employees);

    console.log(this.employees);
  }
}
