import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { OrderService } from './order.service';
/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'custservice-cmp',
	templateUrl: 'order.component.html'
})

export class OrderComponent{

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

	//testid:number;
	public user: any =[];
	 public data: any= [];
	 public orders: any= [];
	 constructor(public ord: OrderService,private _http: HttpModule){
         
		  this.ord.getOrders().then(result => {
          this.orders=result;
		  console.log(this.orders);
       
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
	 onSubmit(f: NgForm) {
		 alert("test2");
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  onSubmitEdit() {
		this.verificationCode="asdqwe123adsd";
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
	
  }

   onSubmitAdd() {
		this.verificationCode="asdqwe123adsd";
		console.log(this.cusFirstName);
	
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
			this.cust.addCustomer(this.data[0]);
	
  }

  onSubmitDel() {
		this.verificationCode="asdqwe123adsd";
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
	
  }
}
