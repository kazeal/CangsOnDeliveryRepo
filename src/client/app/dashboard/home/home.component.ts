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

import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

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
	public statuses: any= [
		 "pending","verified","canceled","delivered",
	 ];
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(public ord: HomeService,
                public cus: CustomerService,
	 			private chRef: ChangeDetectorRef,
         		private zone: NgZone,
                private toastyService:ToastyService, 
                private toastyConfig: ToastyConfig,
				private _http: HttpModule){
         this.toastyConfig.theme = 'default';
         this.toastyConfig.position="bottom-right";
       
		  this.ord.getOrders().subscribe(data => {
				this.orders=data;
				console.log(this.orders);
    	  });
          console.log("138");
    }
    
    test(){
        
            // Just add default Toast with title only
            this.toastyService.default('Hi there');
            // Or create the instance of ToastOptions
            var toastOptions:ToastOptions = {
                title: "My title",
                msg: "The message",
                showClose: true,
                timeout: 5000,
                theme: 'default',
                onAdd: (toast:ToastData) => {
                    console.log('Toast ' + toast.id + ' has been added!');
                },
                onRemove: function(toast:ToastData) {
                    console.log('Toast ' + toast.id + ' has been removed!');
                }
            };
           
            // Add see all possible types in one shot
            this.toastyService.info(toastOptions);
            this.toastyService.success(toastOptions);
            this.toastyService.wait(toastOptions);
            this.toastyService.error(toastOptions);
            this.toastyService.warning(toastOptions);
    }
    export(){
        console.log("in");
        console.log(this.orders);
        for(var i=0;i<this.details.length;i++)
        {     
            this.data.push({
                'ordetQuantity': this.details[i].ordetQuantity, 
				'itemID': this.details[i].itemID, 
				'itemName': this.details[i].itemName, 
				'itemDescription': this.details[i].itemDescription,
				'ordetPrice': this.details[i].ordetPrice, 
				'ordetSubtotal': this.details[i].ordetSubtotal,
                'total': "",
                'cash': "",
                'change': "",
                'cusLastName': "",
                'cusFirstName': "",
                'cusMiddleName': "",
                'address': "",
                'number': "",
            });
        }
        this.data.push({
                'ordetQuantity': "", 
				'itemID': "", 
				'itemName': "", 
				'itemDescription': "",
				'ordetPrice': "", 
				'ordetSubtotal': "",
        });
        this.data.push({
                'ordetQuantity': "", 
				'itemID': "", 
				'itemName': "", 
				'itemDescription': "Total",
				'ordetPrice': "Cash", 
				'ordetSubtotal': "Change",
        });
         this.data.push({
                'ordetQuantity': "", 
				'itemID': "", 
				'itemName': "", 
				'itemDescription': this.total2,
				'ordetPrice': this.tender, 
				'ordetSubtotal': this.change,
        });
        this.data.push({
                'ordetQuantity': "Customer", 
				'itemID': "", 
				'itemName': "", 
				'itemDescription': "",
				'ordetPrice': "", 
				'ordetSubtotal': "",
        });
        this.data.push({
                'ordetQuantity': "Last Name", 
				'itemID': "First Name", 
				'itemName': "Middle Name", 
				'itemDescription': "Address",
				'ordetPrice': "Number", 
				'ordetSubtotal': "",
        });
        this.data.push({
                'ordetQuantity': this.customer[0].cusLastName,
                'itemID': this.customer[0].cusFirstName,
                'itemName': this.customer[0].cusMiddleName,
                'itemDescription': this.customer[0].address,
                'ordetPrice': this.customer[0].number,
                'ordetSubtotal': "",
        });
        
        console.log("mid");
        let time = new Date();
        let mm =time.getMonth();
        let yy =time.getFullYear();
        mm += 1;
        var options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true, 
            showTitle: true,
            useBom: true,
            headers:['Qty','Item ID','Item Name','Item Description',
                    'Price','SubTotal',
                    ]
        };
        
       new Angular2Csv(this.data, 'Order ID '+this.ID,options);
       this.data=[];
       console.log("out");
    }
	onChange(element: HTMLInputElement,event:any,orderID:number,customerID:number,orderDate:string,orderTotal:number,orderStatus:string,orderRemarks:string,orderTime:string,packaging:string,location:string,cashTendered:any)
	{
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
		this.ord.updateOrderStatus(this.data[0]);
		this.data.pop();
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
            alert("You have a new Order!!!Order ID:"+this.neword[o].orderID);
            this.neword=[];
            this.subscribeToData();
           // console.log(this.orders);
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
