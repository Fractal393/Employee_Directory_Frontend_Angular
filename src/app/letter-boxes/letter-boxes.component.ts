import { Component, Input } from '@angular/core';
import { alphabets } from '../model';
import { EmployeeService, IEmployee } from '../employee.service';
import { BodyComponent } from '../body/body.component';
@Component({
  selector: 'app-letter-boxes',
  templateUrl: './letter-boxes.component.html',
  styleUrls: ['./letter-boxes.component.css'],
})
export class LetterBoxesComponent {
  alphabets = [...alphabets];
  // employees: IEmployee[] = [];

  @Input() bodyComponent!: BodyComponent;

  constructor(private employeeService: EmployeeService) {}

  onClick(alphabet: string) {
    this.employeeService.getByAlphabet(alphabet).subscribe((data) => {
      this.bodyComponent.onSearchResults(data);
    });
  }
}
