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
@Component({
	moduleId: module.id,
	selector: 'customer-cmp',
	templateUrl: 'customer.component.html'
})

export class CustomerComponent implements OnInit {
	
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
	complexForm : FormGroup;
	public data: any= [];
	public customers: any= [];
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(
		 public cust: CustomerService,
		 private _http: HttpModule,
		 public fb: FormBuilder,
		  private chRef: ChangeDetectorRef,
         private zone: NgZone,
		 private _cookieService:CookieService
		 ){
         this.complexForm = fb.group({
				'firstName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'middleName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'lastName': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'number' : [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("[0-9][0-9 ]+")])],
				'address' : [null, Validators.required],
		  })
		  this.cust.getCustomers().subscribe(result => {
				this.customers=result;
    	  });
		  if(this._cookieService.get('1') == "true")
			this.addCustomer=true;
		  if(this._cookieService.get('2') == "true")
		 	this.editCustomer=true;
		  if(this._cookieService.get('3') == "true")
			this.delCustomer=true;   
		 
		  console.log("1");
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
				'verificationCode': this.verificationCode				
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
				'verificationCode': this.verificationCode				
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
			document.getElementById('del').style.display='none';
	}
	 ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.cust.getCustomers().subscribe(

        data  => {
                    console.log(this.customers.length);
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
								'verificationCode': customer.verificationCode 				
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
                                console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
			console.log(this.complexForm.controls['number'].hasError('pattern'))
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

        this.timerSubscription = Observable.timer(5000)
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
