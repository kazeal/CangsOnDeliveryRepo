import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class OrderService{
    post: any;
    head = new Headers();
    requestOptions = new RequestOptions();
    private _orderUrl = 'http://192.168.0.24:1025/orders/all';
    private _orderAddUrl ='http://192.168.0.24:1025/orders/addOrder';
    private _orderEditUrl ='http://192.168.0.24:1025/orders/editOrder';
    private _orderDelUrl ='http://192.168.0.24:1025/orders/deleteOrder';
    constructor(private _http: Http){
        //http://localhost:52282/customer/addCustomer
        //console.log("RUNNING");
        //https://cangsapi.000webhostapp.com/index.php/Products/get_products
         //this.getProducts();

    }
     
    getOrders(){
         return this._http.get(this._orderUrl).map((res:Response) => res.json());
        /*
        return new Promise(resolve => {
          this._http.get(this._orderUrl).map(res => res.json()).subscribe(data => {
          this.post = data;
          resolve(this.post);
          console.log(this.post);
        });
        }
     )};
     */
    }
    updateOrderStatus(data:any){
          let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })
            
            
            this._http.post(this._orderEditUrl,JSON.stringify(data), reqopt).subscribe(function(res){
                this.response=res;
                alert(this.response);
            });
        
    }

  

    
}