import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("https://localhost:5002/api/Employee");
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>("https://localhost:5002/api/Employee", employee);
  }

  public deleteEmployee(id:number): Observable<unknown> {
    return this.http.delete(`${"https://localhost:5002/api/Employee"}/${id}`);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${"https://localhost:5002/api/Employee"}/${employee.id}`, employee);
  }
}
