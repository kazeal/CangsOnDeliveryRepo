import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { OrderService } from './order.service';
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { CustomerService } from '../customer/customer.service';
@Component({
	moduleId: module.id,
	selector: 'order-cmp',
	templateUrl: 'order.component.html'
})

export class OrderComponent implements OnInit{

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
    total2:any;
    public customer: any= [];
    public details: any= [];
	public customerID:number;
    found:boolean =false;
	i:number=0;
    public neword:any =[];
	public data: any= [];
    public orders: any= [];
	public statuses: any= [
		 "pending","verified","canceled","delivered",
	 ];
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(public ord: OrderService,
                public cus: CustomerService,
	 			private chRef: ChangeDetectorRef,
         		private zone: NgZone,
				private _http: HttpModule){
         
		  this.ord.getOrders().subscribe(data => {
				this.orders=data;
				console.log(this.orders);
    	  });
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
                'cashTendered': cashTendered,				
			});
		this.ord.updateOrderStatus(this.data[0]);
		this.data.pop();
	}
    orderDetail(id:any, total:any,cusID:any, tender2:any)
    {
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
        console.log(this.details);
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
                    console.log(this.orders.length);
                    var i =0;
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
                                console.log(test);
                        }
                    }
                    i=0;   
                    // console.log(this.items.data);                
                    // console.log("latestest");      
            //this.items.data = data;
            this.subscribeToData();
            console.log(this.orders);
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
