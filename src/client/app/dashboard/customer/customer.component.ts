import { Component } from '@angular/core';
import { CustomerService } from './customer.service';
import { NgForm } from '@angular/forms'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'customer-cmp',
	templateUrl: 'customer.component.html'
})

export class CustomerComponent {
	addCustomer:boolean=false;
	editCustomer:boolean=false;
	delCustomer:boolean=false;
	cusFirstName:string;
	cusMiddleName:string;
	cusLastName:string;
	cusPassword:string;
	number:string;
	address:string;
	verificationCode:string;
	public customerID:number;
	i:number=0;
	
	
	public pusheditems:{[cusFirstName: string]: any;};
	complexForm : FormGroup;
	//testid:number;
	public user: any =[];
	 public data: any= [];
	 public customers: any= [];
	 constructor(
		 public cust: CustomerService,
		 private _http: HttpModule,
		 public fb: FormBuilder,
		 private _cookieService:CookieService){
         this.complexForm = fb.group({
		
	    	'firstName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
			'middleName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
	    	'lastName': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
	    	'number' : [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("[0-9][0-9 ]+")])],
	    	'address' : [null, Validators.required],
		  })
		  this.cust.getCustomers().then(result => {
          this.customers=result;
		  console.log(this.customers);
		  if(this._cookieService.get('1') == "true")
		  this.addCustomer=true;
		  if(this._cookieService.get('2') == "true")
		  this.editCustomer=true;
		  if(this._cookieService.get('3') == "true")
		  this.delCustomer=true;
       
    });
    }

	click(event:any, id:number,pass:string,fname:string,mname:string,lname:string,number:string,address:string,vercode:string){
		console.log(id);
		this.cusPassword=pass;
		this.cusFirstName=fname;
		this.cusMiddleName=mname;
		this.cusLastName=lname;
		this.number=number;
		this.address=address;
		this.verificationCode=vercode;
		this.customerID=id;
		//console.log(id);
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
  }
  onSubmitEdit() {
	  
		//this.verificationCode="asdqwe123adsd";
		console.log(this.customerID);
	
			this.data.push({
				'customerID': this.customerID, 
				'cusPassword': this.cusPassword, 
				'number': this.number, 
				'address': this.address,
				'cusLastName': this.cusLastName, 
				'cusMiddleName': this.cusMiddleName, 
				'cusFirstName': this.cusFirstName,				
				'verificationCode': this.verificationCode				
			});
			console.log(this.data[0]);
			this.cust.editCustomer(this.data[0]);
			this.cusPassword="";
			this.cusFirstName="";
			this.cusMiddleName="";
			this.cusLastName="";
			this.number="";
			this.address="";
			this.verificationCode="";
			this.customerID=null;
  }

   onSubmitAdd() {
	   	let uuid = UUID.UUID();	
		this.verificationCode=uuid.slice(0,-23);
		let uuid2 = UUID.UUID();
		console.log(uuid2);	
		this.cusPassword=uuid2.slice(0,-28);
		console.log(this.cusPassword);
	
			this.data.push({
				'cusPassword': Md5.hashStr(this.cusPassword), 
				'number': this.number, 
				'address': this.address,
				'cusLastName': this.cusLastName, 
				'cusMiddleName': this.cusMiddleName, 
				'cusFirstName': this.cusFirstName,				
				'verificationCode': this.verificationCode				
			});
			console.log(this.data[0]);
			this.cust.addCustomer(this.data[0], this.cusPassword);
			this.cusPassword="";
			this.cusFirstName="";
			this.cusMiddleName="";
			this.cusLastName="";
			this.number="";
			this.address="";
			this.verificationCode="";
			
	
  }

  onSubmitDel() {
		//this.verificationCode="asdqwe123adsd";
		console.log(this.customerID);
	
			this.data.push({
				'customerID': this.customerID, 
				'cusPassword': this.cusPassword, 
				'number': this.number, 
				'address': this.address,
				'cusLastName': this.cusLastName, 
				'cusMiddleName': this.cusMiddleName, 
				'cusFirstName': this.cusFirstName,				
				'verificationCode': this.verificationCode				
			});
			console.log(this.data[0]);
			this.cust.delCustomer(this.data[0]);
			this.cusPassword="";
			this.cusFirstName="";
			this.cusMiddleName="";
			this.cusLastName="";
			this.number="";
			this.address="";
			this.verificationCode="";
			this.customerID=null;
			
			
	
  }
}
