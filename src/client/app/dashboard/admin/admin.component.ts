import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { EmployeeService } from '../custservice/employee.service';
/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'admin-cmp',
	templateUrl: 'admin.component.html'
})
	
export class AdminComponent {

	oldPass:string='';
	newPass:string='';
	newPass2:string='';
	public employees: any = [];
	public oneEmployee: any = [];
	public data:any = [];
	constructor(public emp: EmployeeService, private _cookieService:CookieService){

		  this.emp.getEmployee().then(result => {
          this.employees=result;
		  console.log(this.employees); 
    	});
	}

	onSubmit(event:any)
	{
		console.log(Md5.hashStr(this.oldPass));
		console.log(this._cookieService.get("employeePassword"));
		 if(Md5.hashStr(this.oldPass) == this._cookieService.get("employeePassword"))
		 {
			 if(this.newPass == this.newPass2)
			 {
				 
				   this.emp.getOneEmployee(this._cookieService.get("employeeID")).then(result => {
						this.oneEmployee=result;
						console.log(this.oneEmployee); 
					});
					setTimeout (() => {
						this.data.push({
						'employeeID': this._cookieService.get("employeeID"),
						'empPassword': Md5.hashStr(this.newPass), 
						'empType': this.oneEmployee[0]["empType"], 
						'empLastName': this.oneEmployee[0]["empLastName"], 
						'empMiddleName': this.oneEmployee[0]["empMiddleName"],
						'empFirstName': this.oneEmployee[0]["empFirstName"], 			
						});
						this.emp.editEmployee(this.data[0]);
					}, 2000)	
			 }
			 else
			 alert("New Password does not Match");			 
		 }
		 else
		 alert("Incorrect Old Password");
	     // this.emp.getOneEmployee(this._cookieService.get("employeeID"));
		  
	}

}
