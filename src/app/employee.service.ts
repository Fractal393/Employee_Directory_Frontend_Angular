import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface IEmployee {
  employeeId: number;
  firstName: string;
  lastName: string;
  preferredName: number;
  office: string;
  phoneNumber: string;
  skypeID: string;
  email: string;
  department: string;
  jobTitle: string;
  imagePath: string;
}

export interface IUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://localhost:7213/Employees';
  private lrUrl = 'https://localhost:7213/Users';

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error('Error ccured; please try again later.'));
  }

  getEmployees() {
    return this.http
      .get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  addEmployees(newEmployee: IEmployee): Observable<IEmployee> {
    return this.http
      .post<IEmployee>(this.baseUrl, newEmployee)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(employeeId: number): Observable<unknown> {
    const url = `${this.baseUrl}/${employeeId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  updateEmployee(
    updatedEmployee: IEmployee,
    employeeId: number
  ): Observable<IEmployee> {
    const url = `${this.baseUrl}/${employeeId}`;
    return this.http
      .put<IEmployee>(url, updatedEmployee)
      .pipe(catchError(this.handleError));
  }

  getByAlphabet(alphabet: string) {
    const url = `${this.baseUrl}?letter=${alphabet}`;
    return this.http.get<IEmployee[]>(url).pipe(catchError(this.handleError));
  }

  getBySidebarFilters(department: string, office: string, jobTitle: string) {
    const url = `${this.baseUrl}?department=${department}&office=${office}&jobTitle=${jobTitle}`;
    return this.http.get<IEmployee[]>(url).pipe(catchError(this.handleError));
  }

  getBySearch(searchText: string, searchBy: string): Observable<IEmployee[]> {
    const url = `${this.baseUrl}?searchText=${searchText}&searchBy=${searchBy}`;
    return this.http.get<IEmployee[]>(url).pipe(catchError(this.handleError));
  }

  register(user: IUser): Observable<any> {
    const url = `${this.lrUrl}/Register`;
    return this.http.post(url, user);
  }

  login(user: IUser): Observable<any> {
    const url = `${this.lrUrl}/login`;
    return this.http.post(url, user).pipe(catchError(this.handleError));
  }
}
