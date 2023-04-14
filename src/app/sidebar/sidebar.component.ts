import { Component, Input } from '@angular/core';
import { departments, jobTitles, offices } from '../model';
import { Observable } from 'rxjs';
import { EmployeeService, IEmployee } from '../employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private employeeService: EmployeeService) {}
  @Input() sidebarOpen!: boolean;

  departments = [...departments];

  offices = [...offices];

  jobTitles = [...jobTitles];

  limit = 2;

  employees!: IEmployee[];

  showMore() {
    this.limit = this.jobTitles.length;
  }

  showLess() {
    this.limit = 2;
  }

  sidebarFilter(department: string, office: string, jobTitle: string) {
    this.employeeService
      .getBySidebarFilters(department, office, jobTitle)
      .subscribe((data: IEmployee[]) => (this.employees = { ...data }));
  }
}

//signals
