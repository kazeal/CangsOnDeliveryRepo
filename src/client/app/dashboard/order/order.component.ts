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
	selector: 'order-cmp',
	templateUrl: 'order.component.html'
})

export class OrderComponent{

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

	//testid:number;
	public user: any =[];
	 public data: any= [];
	 public orders: any= [];
	 public statuses: any= [
		 "pending","verified","canceled","delivered",
		
	 ];
	 
	 constructor(public ord: OrderService,private _http: HttpModule){
         
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
				'location': orderTime,
				'orderTime': packaging,
				'packaging': location, 
				'customerID': customerID,  				
			});
		this.ord.updateOrderStatus(this.data[0]);
	}

}
