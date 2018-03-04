import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CustomerService } from '../customer/customer.service';
import { EmployeeService } from '../custservice/employee.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AnonymousSubscription } from "rxjs/Subscription";
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UUID } from 'angular2-uuid';
@Component({
	moduleId: module.id,
	selector: 'reset-cmp',
	templateUrl: 'reset.component.html'
})
	
export class ResetComponent {

	customerID:string='';
	recustomerID:string='';
	customerID2:string='';
	recustomerID2:string='';
	customerID3:string='';
	recustomerID3:string='';
	public customers: any = [];
	public oneCustomer: any = [];
	public oneEmployee: any = [];
	public data:any = [];
	resettemp:boolean=false;
	cusPassword:string;
	empPassword:string;
	verificationCode:string;
	complexForm : FormGroup;
	complexForm2 : FormGroup;
	complexForm3 : FormGroup;
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(
		public cus: CustomerService,
		public emp: EmployeeService,
		public fb: FormBuilder,
		public fb2: FormBuilder,
		private chRef: ChangeDetectorRef,
        private zone: NgZone,
		private _cookieService:CookieService){

		  this.cus.getCustomers().subscribe(result => {
          this.customers=result;
		  console.log(this.customers); 
    	});
		var type=this._cookieService.get('employeeType');
		if(type == "admin" || type == "administrator" || type == "Administrator" || type == "Admin")
        this.resettemp=true;
		this.complexForm = fb.group({
				'customerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
				'recustomerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
		});
		this.complexForm2 = fb2.group({
				'customerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
				'recustomerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
		});
		this.complexForm3 = fb2.group({
				'customerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
				'recustomerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
		});
		console.log("test5");
	}

	onSubmitPass(event:any)
	{

		if(this.customerID == this.recustomerID)
		{
			
			this.cus.getCustomer(this.customerID).subscribe(result => {
				this.oneCustomer=result;
				if(this.oneCustomer.length==0)
				alert("Customer ID does not exist")
				console.log(this.oneCustomer); 
			});
			
			setTimeout (() => {
				let uuid2 = UUID.UUID();
				
				this.cusPassword=uuid2.slice(0,-28);
				this.data.push({
					'customerID': this.oneCustomer[0].customerID, 
					'cusPassword': Md5.hashStr(this.cusPassword), 
					'number': this.oneCustomer[0].number, 
					'address': this.oneCustomer[0].address,
					'cusLastName': this.oneCustomer[0].cusLastName, 
					'cusMiddleName': this.oneCustomer[0].cusMiddleName, 
					'cusFirstName': this.oneCustomer[0].cusFirstName,				
					'verificationCode': this.oneCustomer[0].verificationCode				
				});
				this.cus.resetPass(this.data[0],this.cusPassword);
				this.customerID='';
				this.recustomerID='';
				this.cusPassword='';
				this.data.pop();
				this.oneCustomer.pop();
				this.complexForm.reset();
			}, 1500)	
		}
		else
		{
			alert("Customer ID does not match");
		}
					 
		 
		
		
	}
	onSubmitCode(event:any)
	{
		 
		if(this.customerID2 == this.recustomerID2)
		{
			
			this.cus.getCustomer(this.customerID2).subscribe(result => {
				this.oneCustomer=result;
				if(this.oneCustomer.length==0)
				alert("Customer ID does not exist")
				console.log(this.oneCustomer); 
			});
			
			setTimeout (() => {
				let uuid2 = UUID.UUID();
				
				this.verificationCode=uuid2.slice(0,-23);
				this.data.push({
					'customerID': this.oneCustomer[0].customerID, 
					'cusPassword': this.oneCustomer[0].cusPassword, 
					'number': this.oneCustomer[0].number, 
					'address': this.oneCustomer[0].address,
					'cusLastName': this.oneCustomer[0].cusLastName, 
					'cusMiddleName': this.oneCustomer[0].cusMiddleName, 
					'cusFirstName': this.oneCustomer[0].cusFirstName,				
					'verificationCode': this.verificationCode				
				});
				this.cus.resetCode(this.data[0],this.verificationCode);
				this.customerID2='';
				this.recustomerID2='';
				this.verificationCode='';
				this.data.pop();
				this.complexForm2.reset();
			}, 1500)	
		}
		else
		{
			alert("Customer ID does not match");
		}
	}

	onSubmitEmpPass(event:any)
	{
		if(this.customerID3 == this.recustomerID3)
		{
			
			this.emp.getOneEmployee(this.customerID3).then(result => {
				this.oneEmployee=result;
				if(this.oneEmployee.length==0)
				alert("Employee ID does not exist")
				console.log(this.oneEmployee); 
			});
			
			setTimeout (() => {
				let uuid2 = UUID.UUID();
				this.empPassword=uuid2.slice(0,-28);
				console.log(this.empPassword);
				this.data.push({
					'employeeID': this.customerID3,
					'empPassword': Md5.hashStr(this.empPassword), 
					'empType': this.oneEmployee[0].empType, 
					'empLastName': this.oneEmployee[0].empLastName, 
					'empMiddleName': this.oneEmployee[0].empMiddleName,
					'empFirstName': this.oneEmployee[0].empFirstName, 				
				});
				this.emp.resetPass(this.data[0],this.empPassword);
				this.customerID3='';
				this.recustomerID3='';
				this.empPassword='';
				this.data.pop();
				this.complexForm3.reset();
			}, 1500)	
		}
		else
		{
			alert("Employee ID does not match");
		}
	}

	ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.cus.getCustomers().subscribe(

        data  => {
                    console.log(this.customers.length);
                    var i =0;
                    for (let customer of data)
                    {
                                                                
                            this.customers[i]=({
                                'customerID': customer.customerID, 
								'cusPassword': customer.cusPassword, 
								'number': customer.number, 
								'address': customer.address,
								'cusLastName': customer.cusLastName, 
								'cusMiddleName': customer.cusMiddleName, 
								'cusFirstName': customer.cusFirstName,				
								'verificationCode': customer.verificationCode  				
                            });
                            i=i+1;
							if(this._cookieService.get("customerID") == customer.customerID)
							this._cookieService.put("customerID",customer.cusPassword);
                    }
                    if(i < this.customers.length)
                    {
                        let dif = this.customers.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.customers.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
			this.subscribeToData();
            console.log(this.customers);
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
