import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from './../../models/employee';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  private employeeService: EmployeeService;
  public employees: Employee[] = [];
  employeeId: number = 0;
  firstName: string = "";
  lastName: string = "";
  sex: number = 0;
  update: boolean = false;

  postData = {} as Employee;
  employeeForm = this.formBuilder.group({
    id: null,
    firstName: '',
    lastName: '',
    sex: 0
  });

  constructor(employeeService: EmployeeService, private formBuilder: FormBuilder) { 
    this.employeeService = employeeService;
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employeesFromApi) =>{
      this.employees = employeesFromApi;
    })
  }

  addEmployee(): void {
    this.postData.firstName = this.employeeForm.value.firstName;
    this.postData.lastName = this.employeeForm.value.lastName;
    this.postData.sex = this.employeeForm.value.sex;
    this.employeeService.addEmployee(this.postData).subscribe(newEmployee => {
      this.employees.push(newEmployee);
      
      this.resetFormValues();
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(x => x.id != id);
    });
  }

  loadValuesToForm(employee: Employee): void {
    this.employeeId = employee.id
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.sex = employee.sex;
    this.update = true;
  }

  updateEmployee(): void {
    this.postData.id = this.employeeId;
    this.postData.firstName = this.firstName;
    this.postData.lastName = this.lastName;
    this.postData.sex = this.sex;
    this.employeeService.updateEmployee(this.postData).subscribe(updatedEmployee => {
      let index = this.employees.map(e => e.id).indexOf(updatedEmployee.id);
      this.employees[index] = updatedEmployee;
      this.resetFormValues();
    });
  }

  resetFormValues(): void {
    this.firstName = "";
    this.lastName = "";
    this.sex = 0;
    this.update = false;
  }

}
