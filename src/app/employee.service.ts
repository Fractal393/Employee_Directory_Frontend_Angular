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

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://localhost:7213/Employees';

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
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
}
