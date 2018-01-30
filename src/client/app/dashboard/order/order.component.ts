import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { OrderService } from './order.service';
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
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
	public customerID:number;
	i:number=0;

	public data: any= [];
    public orders: any= [];
	public statuses: any= [
		 "pending","verified","canceled","delivered",
	 ];
	private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	constructor(public ord: OrderService,
	 			private chRef: ChangeDetectorRef,
         		private zone: NgZone,
				private _http: HttpModule){
         
		  this.ord.getOrders().subscribe(data => {
				this.orders=data;
				console.log(this.orders);
    	  });
    }
	onChange(element: HTMLInputElement,event:any,orderID:number,customerID:number,orderDate:string,orderTotal:number,orderStatus:string,orderRemarks:string,orderTime:string,packaging:string,location:string)
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
			});
		this.ord.updateOrderStatus(this.data[0]);
		this.data.pop();
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
                            console.log(order);               
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
                            });
                            i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                            
                            //console.log(item);
                            //console.log(i);
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
