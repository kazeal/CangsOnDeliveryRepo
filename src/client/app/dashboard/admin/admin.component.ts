import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { EmployeeService } from '../custservice/employee.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AnonymousSubscription } from "rxjs/Subscription";
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
	complexForm : FormGroup;
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(
		public emp: EmployeeService,
		public fb: FormBuilder,
		private chRef: ChangeDetectorRef,
        private zone: NgZone,
		private _cookieService:CookieService){

		  this.emp.getEmployee().subscribe(result => {
          this.employees=result;
		  console.log(this.employees); 
    	});
		 this.complexForm = fb.group({
				'pass' : [null, Validators.compose([Validators.required, Validators.maxLength(16)])],
				'new' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
				'new2': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],			
		});
		console.log("test5");
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
						this.newPass='';
						this.oldPass='';
						this.newPass2='';
						this.complexForm.reset();
					}, 2000)	
			 }
			 else
			 alert("New password does not match");			 
		 }
		 else
		 alert("Incorrect old password");  
	}
	ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.emp.getEmployee().subscribe(

        data  => {
                    console.log(this.employees.length);
                    var i =0;
                    for (let emps of data)
                    {
                                                                
                            this.employees[i]=({
                                'employeeID': emps.employeeID,
								'empPassword': emps.employeeID, 
								'empType': emps.empType, 
								'empLastName': emps.empLastName, 
								'empMiddleName': emps.empMiddleName,
								'empFirstName': emps.empFirstName,  				
                            });
                            i=i+1;
							if(this._cookieService.get("employeeID") == emps.employeeID)
							this._cookieService.put("employeePassword",emps.empPassword);
                    }
                    if(i < this.employees.length)
                    {
                        let dif = this.employees.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.employees.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
			this.subscribeToData();
            console.log(this.employees);
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log("complete");
        }
        );
        });
    }
    private subscribeToData(): void {

        this.timerSubscription = Observable.timer(3000)
            .subscribe(() => this.refreshData());
    }
     public ngOnDestroy(): void {

            if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
            }
            if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            }
    }
}
