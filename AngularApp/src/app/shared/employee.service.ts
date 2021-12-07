import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee:Employee;
  employees:Employee[];
  readonly URL='http://localhost:3000/employees';

  constructor(private http:HttpClient) { }

  postEmployee(employee:Employee){
    return this.http.post(this.URL,employee);
  }

  getEmployeeList(){
    return this.http.get(this.URL)
  }

  putEmployee(employee:Employee){
    return this.http.put(this.URL+`/${employee._id}`,employee);
  }

  deleteEmployee(_id:string){
    return this.http.delete(this.URL+`/${_id}`);
  }
}
