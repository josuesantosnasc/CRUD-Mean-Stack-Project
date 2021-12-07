
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

declare var $:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService:EmployeeService) { }

  columnsToDisplay=['name','position','office','salary','actions'];

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
    }
      
      this.employeeService.selectedEmployee={
        _id:"",
        name:"",
        position:"",
        office:"",
        salary:0
      }
    
  }

  onSubmit(form:NgForm){
    if(form.value._id==""){
      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        $(document).ready(function(){
          $('.toast.submit').toast('show');
        });
        
      })
    }else{
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        $(document).ready(function(){
          $('.toast.update').toast('show');
        });
      })
    }
    
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((response)=>{
      this.employeeService.employees=response as Employee[];
    })
  }

  onEdit(employee:Employee){
    this.employeeService.selectedEmployee=employee;
  }

  onDelete(_id:string,form:NgForm){
    if(confirm("Are you sure to delete this record? ")==true){
      this.employeeService.deleteEmployee(_id).subscribe(response=>{
        this.refreshEmployeeList();
        this.resetForm(form);
        $(document).ready(function(){
          $('.toast.delete').toast('show');
        });
      })
    }
  }

}
