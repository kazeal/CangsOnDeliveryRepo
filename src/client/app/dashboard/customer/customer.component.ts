import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { NgForm } from '@angular/forms'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AnonymousSubscription } from "rxjs/Subscription";
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { EmployeeService } from '../custservice/employee.service';
@Component({
	moduleId: module.id,
	selector: 'customer-cmp',
	templateUrl: 'customer.component.html'
})

export class CustomerComponent implements OnInit {
	
	verify:boolean=true;
	addCustomer:boolean=false;
	editCustomer:boolean=false;
	delCustomer:boolean=false;
	cusFirstName:string;
	cusMiddleName:string;
	cusLastName:string;
	cusPassword:string;
	number:string;
	address:string;
	empPassword:string;
	verificationCode:string;
	resettemp:boolean=false;
	public customerID:number;
	i:number=0;
	complexForm : FormGroup;
	complexForm2 : FormGroup;
	complexForm3 : FormGroup;
	complexForm4 : FormGroup;
	complexForm5 : FormGroup;
	public data: any= [];
	public customers: any= [];
	customerID4:string='';
	recustomerID4:string='';
	customerID2:string='';
	recustomerID2:string='';
	customerID3:string='';
	recustomerID3:string='';
	oneCustomer:any=[];
	oneEmployee:any=[];
	custservpass:any="";
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	filter:string='';
	barangay:string="Bagacay";
	constructor(
		 public cust: CustomerService,
		 private _http: HttpModule,
		 public fb: FormBuilder,
		 private chRef: ChangeDetectorRef,
		 public emp: EmployeeService,
         private zone: NgZone,
		 private _cookieService:CookieService
		 ){
		var type=this._cookieService.get('employeeType');
		if(type == "admin" || type == "administrator" || type == "Administrator" || type == "Admin")
        this.resettemp=true;
         this.complexForm = fb.group({
				'firstName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'lastName': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'number' : [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("[0-9][0-9 ]+")])],
				'address' : [null, Validators.required],
		  });
		this.complexForm4 = fb.group({
				'customerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
				'recustomerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
		});
		this.complexForm5 = fb.group({
				'pass' : [null, Validators.required],
		});
		this.complexForm2 = fb.group({
				'customerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
				'recustomerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
		});
		this.complexForm3 = fb.group({
				'customerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
				'recustomerID' : [null, Validators.compose([Validators.required, Validators.pattern("[0-9 ]+")])],
		});
		  this.cust.getCustomers().subscribe(result => {
				this.customers=result;
    	  });
		  if(this._cookieService.get('1') == "true")
			this.addCustomer=true;
		  if(this._cookieService.get('2') == "true")
		 	this.editCustomer=true;
		  if(this._cookieService.get('3') == "true")
			this.delCustomer=true;   
		 
		  console.log("9");
    }
	change()
	{
		this.verify=false;
		console.log("change");
	}
	onSubmitCustServPass(){
		this.emp.getOneEmployee(this._cookieService.get('employeeID')).subscribe(data => {
					this.oneEmployee=data;
		});
		setTimeout (() => {
				if(this.oneEmployee[0].password==this.custservpass)
				{
					document.getElementById('confirm').style.display='none';
					document.getElementById('reset').style.display='block';
				}
				else
				{
					alert("Your password is incorrect!");
				}
		}, 1000)	

	}
	click(event:any, id:number,pass:string,fname:string,mname:string,lname:string,number:string,address:string,vercode:string,bar:string){
		console.log(id);
		this.barangay=bar;
		this.cusPassword=pass;
		this.cusFirstName=fname;
		this.cusMiddleName=mname;
		this.cusLastName=lname;
		this.number=number;
		this.address=address;
		this.verificationCode=vercode;
		this.customerID=id;
		console.log(this.complexForm4);
		this.complexForm4.controls['customerID'].setValue(id);
		this.complexForm4.controls['recustomerID'].setValue(id);
		//this.complexForm4.valid=true;
		
	}
	
	clear(){
		this.cusPassword="";
		this.cusFirstName="";
		this.cusMiddleName="";
		this.cusLastName="";
		this.number="";
		this.address="";
		this.verificationCode="";
		this.customerID=null;
		this.complexForm.reset();
		 this.complexForm4.markAsPristine();
        this.complexForm4.markAsUntouched();
		this.barangay="Bagacay";
		this.verify=true;
  	}
	onSubmitEdit() {  	
			this.data.push({
				'customerID': this.customerID, 
				'cusPassword': this.cusPassword, 
				'number': this.number, 
				'address': this.address,
				'cusLastName': this.cusLastName, 
				'cusMiddleName': this.cusMiddleName, 
				'cusFirstName': this.cusFirstName,				
				'verificationCode': this.verificationCode,
				'barangay': this.barangay,				
			});
			//console.log(this.data[0]);
			this.cust.editCustomer(this.data[0]);
			this.data.pop();
			this.cusPassword="";
			this.cusFirstName="";
			this.cusMiddleName="";
			this.cusLastName="";
			this.number="";
			this.address="";
			this.verificationCode="";
			this.customerID=null;
			this.verify=true;
			this.complexForm.reset();
			document.getElementById('edit').style.display='none';
	}

	onSubmitAdd() {
		 	
			let uuid = UUID.UUID();	
			this.verificationCode=uuid.slice(0,-23);
			let uuid2 = UUID.UUID();
			//console.log(uuid2);	
			this.cusPassword=uuid2.slice(0,-28);
			//console.log(this.cusPassword);
			this.data.push({
				'cusPassword': Md5.hashStr(this.cusPassword), 
				'number': this.number, 
				'address': this.address,
				'cusLastName': this.cusLastName, 
				'cusMiddleName': this.cusMiddleName, 
				'cusFirstName': this.cusFirstName,				
				'verificationCode': this.verificationCode,
				'barangay': this.barangay,				
			});
			//console.log(this.data[0]);
			this.cust.addCustomer(this.data[0], this.cusPassword);
			this.data.pop();
			this.cusPassword="";
			this.cusFirstName="";
			this.cusMiddleName="";
			this.cusLastName="";
			this.number="";
			this.address="";
			this.verificationCode="";
			this.complexForm.reset();
			document.getElementById('add').style.display='none';
	}

	onSubmitDel() {
			
			console.log(this.customerID);
			this.data.push({
				'customerID': this.customerID, 
				'cusPassword': this.cusPassword, 
				'number': this.number, 
				'address': this.address,
				'cusLastName': this.cusLastName, 
				'cusMiddleName': this.cusMiddleName, 
				'cusFirstName': this.cusFirstName,				
				'verificationCode': this.verificationCode,
				'barangay': this.barangay,			
			});
			console.log(this.data[0]);
			this.cust.delCustomer(this.data[0]);
			this.data.pop();
			this.cusPassword="";
			this.cusFirstName="";
			this.cusMiddleName="";
			this.cusLastName="";
			this.number="";
			this.address="";
			this.verificationCode="";
			this.customerID=null;	
			this.complexForm.reset();		
			document.getElementById('del').style.display='none';
	}
	onSubmitPass(event:any)
	{

		if(this.customerID4 == this.recustomerID4)
		{
			
			this.cust.getCustomer(this.customerID4).subscribe(result => {
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
					'verificationCode': this.oneCustomer[0].verificationCode,
					'barangay': this.oneCustomer[0].barangay,				
				});
				this.cust.resetPass(this.data[0],this.cusPassword);
				this.customerID4='';
				this.recustomerID4='';
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
		 
		if(this.customerID4 == this.recustomerID4)
		{
			
			this.cust.getCustomer(this.customerID4).subscribe(result => {
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
					'verificationCode': this.verificationCode,
					'barangay': this.oneCustomer[0].barangay,
									
				});
				this.cust.resetCode(this.data[0],this.verificationCode);
				this.customerID4='';
				this.recustomerID4='';
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

	 ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.cust.getCustomers().subscribe(

        data  => {
                   // console.log(this.customers.length);
                    var i =0;
                    for (let customer of data)
                    {
                          
                            
                            //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                            //console.log(data);
                            this.customers[i]=({
                                'customerID': customer.customerID, 
								'cusPassword': customer.cusPassword, 
								'number': customer.number, 
								'address': customer.address,
								'cusLastName': customer.cusLastName, 
								'cusMiddleName': customer.cusMiddleName, 
								'cusFirstName': customer.cusFirstName,				
								'verificationCode': customer.verificationCode,
								'barangay': customer.barangay, 				
                            });
                            i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                            
                            //console.log(item);
                            //console.log(i);
                    }
                    if(i < this.customers.length)
                    {
                        let dif = this.customers.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.customers.pop();
                             //   console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
			console.log(this.complexForm.controls['firstName'].pristine);
			console.log(this.complexForm.valid);
			//console.log(this.complexForm.controls['number'].hasError('pattern'))
            this.subscribeToData();
            //console.log(this.customers);
        },
        function (error) {
            console.log(error);
        },
        function () {
          //  console.log("complete");
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
