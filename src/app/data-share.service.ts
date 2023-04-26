import { Injectable } from '@angular/core';
import { EmployeeService, IEmployee } from './employee.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  private employeesSource = new BehaviorSubject<IEmployee[]>([]);
  employees = this.employeesSource.asObservable();

  setData(data: IEmployee[]) {
    this.employeesSource.next(data);
  }
}
