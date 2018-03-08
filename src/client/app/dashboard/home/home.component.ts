import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { HomeService } from './home.service';
import { CustomerService } from '../customer/customer.service';
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{

	orderID:string;
	date:string;
	total:string;
	status:string;
	remarks:string;
	time:string;
	packaging:string;
	location:string;
    tender:any;
    change:any;
    pack:any;
    loc:any;
    deltime:any;
    rem:any;
	public customerID:number;
	i:number=0;
    found:boolean =false;
    neword:any =[];
    total2:any;
    count:any=0;
    public customer: any= [];
	public data: any= [];
    public data2:any=[];
    public orders: any= [];
    public details: any= [];
    public ID:any;
    complexForm4 : FormGroup;
    message:string="";
    can:any=[];
    canc:boolean=false;
	public statuses: any= [
		 "pending","verified","canceled","delivered",
	 ];
    public exportdata:any;
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(public ord: HomeService,
                public cus: CustomerService,
	 			private chRef: ChangeDetectorRef,
         		private zone: NgZone,
                public fb: FormBuilder,
				private _http: HttpModule){
         
          this.complexForm4 = fb.group({
				'stat' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
		  });          
		  this.ord.getOrders().subscribe(data => {
				this.orders=data;
				console.log(this.orders);
    	  });
          console.log("17");
    }
    
    test(){
        
            // Just add default Toast with title only
           
    }
    export(){
        console.log("in");
        console.log(this.orders);
        for(var i=0;i<this.details.length;i++)
        {   
            if(i==0) 
            { 
                    this.data.push({
                        'ordetQuantity': this.customer[0].customerID, 
                        'Qty': this.details[i].ordetQuantity, 
                        'Description': this.details[i].itemName + " "+ this.details[i].itemDescription, 
                    });
            }
            else
            {
                    this.data.push({
                        'Qty': this.details[i].ordetQuantity, 
                        'Description': this.details[i].itemName + " "+ this.details[i].itemDescription, 
                    });
            }
        }
        console.log(this.data);
        let time = new Date();
        let mm =time.getMonth();
        let yy =time.getFullYear();
        mm += 1;
        var options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: false, 
            showTitle: false,
            useBom: true,
            
        };
        
       new Angular2Csv(this.data, 'Order ID '+this.ID,options);
       this.data=[];
       console.log("out");
    }
	onChange(element: HTMLInputElement,event:any,orderID:number,customerID:number,orderDate:string,orderTotal:number,orderStatus:string,orderRemarks:string,orderTime:string,packaging:string,location:string,cashTendered:any)
	{
        if(element.value == "cancelled")
        {
              // console.log("cancelled");
                this.can.push({
                    'orderID': orderID, 
                    'orderDate': orderDate, 
                    'orderTotal': orderTotal, 
                    'orderStatus': element.value,
                    'orderRemarks': orderRemarks, 
                    'location': location,
                    'orderTime': orderTime,
                    'packaging': packaging, 
                    'customerID': customerID,
                    'cashTendered':cashTendered,  				
                });
              document.getElementById('cancel').style.display='block';
           // this.ord.updateOrderStatus(this.data[0]);
            //this.data.pop();

        }
        else
        {
           // console.log("not cancelled");
            this.data.push({
                    'orderID': orderID, 
                    'orderDate': orderDate, 
                    'orderTotal': orderTotal, 
                    'orderStatus': element.value,
                    'orderRemarks': orderRemarks, 
                    'location': location,
                    'orderTime': orderTime,
                    'packaging': packaging, 
                    'customerID': customerID,
                    'cashTendered':cashTendered,  				
                });
            this.ord.updateOrderStatus(this.data[0],this.message);
            this.data.pop();
        }
	}
    onSubmitReason(){
        document.getElementById('cancel').style.display='none';
        console.log(this.can);
        console.log(this.data);
        this.ord.updateOrderStatus(this.can[0],this.message);
        this.can.pop();
        this.message="";
        this.can=[];
        this.canc=true
        this.complexForm4.reset();
    }
    orderDetail(id:any, total:any,cusID:any, tender2:any,orderTime:any,location:any,packaging:any,orderRemarks:any)
    {
        this.ID=id;
        this.ord.getDetails(id).subscribe(data => {
            this.details=data;
        });
        this.cus.getCustomer(cusID).subscribe(data =>{
            this.customer=data;
            console.log(this.customer);
        });
        this.tender=tender2;
        this.total2=total;
        this.change=tender2 - total;
        this.deltime=orderTime;
        setTimeout (() => {
            if(location != "" && location != null && location != " ")
            this.loc=location;
            else
            this.loc=this.customer[0].address;
        }, 1500);   
        
        this.pack=packaging;
        this.rem=orderRemarks;
        console.log(orderTime);
        console.log(packaging);
        console.log(orderRemarks);
        console.log(location);
      //  console.log(this.loc);
    }
    clear()
    {   
        this.customer=[];
        this.details=[];
        this.total2=null;
        this.can.pop();
        this.can=[];
        this.complexForm4.reset();
    }
	 ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.ord.getOrders().subscribe(

        data  => {
                    
                    var i =0;
                    for (let order of data)
                    {          
                           
                            this.neword.push({
                                    'orderID': order.orderID, 
                                    'orderDate': order.orderDate, 
                                    'orderTotal':order.orderTotal, 
                                    'orderStatus': order.orderStatus,
                                    'orderRemarks': order.orderRemarks, 
                                    'location': order.location,
                                    'orderTime': order.orderTime,
                                    'packaging': order.packaging, 
                                    'customerID': order.customerID,
                                    'cashTendered': order.cashTendered,
                            });
                       }  
                       /*           
                           
                        */
                        // console.log(this.neword);
                        if(!this.canc)
                        {
                            for(var l=0;l<this.neword.length;l++)
                            {
                                for(var k=0;k<this.orders.length;k++)
                                {
                                    if(this.orders[k].orderID == this.neword[l].orderID)
                                    {   
                                      //   console.log("After 1 splice");
                                        this.neword.splice(l,1);
                                     //   console.log(this.neword);
                                    }
                                }
                            }
                        }
                        else
                        {
                             for(var l=0;l<this.neword.length;l++)
                            {
                                for(var k=0;k<this.orders.length;k++)
                                {
                                    if(this.orders[k].orderID == this.neword[l].orderID)
                                    {   
                                        this.neword.splice(l,1);
                                        
                                    }
                                }
                            }
                            this.canc=false;
                        }
                    //  console.log(this.neword);
                      for (let order of data)
                      {   
                         this.orders[i]=({
                                'orderID': order.orderID, 
								'orderDate': order.orderDate, 
								'orderTotal':order.orderTotal, 
								'orderStatus': order.orderStatus,
								'orderRemarks': order.orderRemarks, 
								'location': order.location,
								'orderTime': order.orderTime,
								'packaging': order.packaging, 
								'customerID': order.customerID, 
                                'cashTendered': order.cashTendered,				
                            });
                            i=i+1;
                    }
                    if(i < this.orders.length)
                    {
                        let dif = this.orders.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.orders.pop();
                               // console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
            for(var o=0;o<this.neword.length;o++)
            alert("You have a new order! Order ID:"+this.neword[o].orderID);
            this.neword=[];
            this.subscribeToData();
           // console.log(this.orders);
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
