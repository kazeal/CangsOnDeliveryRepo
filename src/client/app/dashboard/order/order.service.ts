import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService{
    post: any;
    public log:any=[];//192.168.1.219:1025
  //  private _apiUrl = 'http://192.168.1.219:1025';//
    private _apiUrl = 'http://192.168.1.219:1025';//
    constructor(private _http: Http, private _cookieService:CookieService){}
     
    getOrders(){return this._http.get(this._apiUrl + "/orders/filterStatusCD").map((res:Response) => res.json());}

    updateOrderStatus(data:any){

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        let time = new Date();
        console.log(time);
       
        let dd =time.getDate();
        let mm =time.getMonth();
        let yy =time.getFullYear();
        let hh =time.getHours();
        let ss =time.getSeconds();
        let min =time.getMinutes();
        let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" +min + ":" + ss;

        this.log.push({
            'orstatStatus':data['orderStatus'],
            'orstatRemarks':this._cookieService.get('employeeName'),
            'orstatDate':timestamp,
            'employeeID':this._cookieService.get('employeeID'),
            'orderID':data['orderID'],
        });

        this._http.post(this._apiUrl + "/orders/editOrder",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
            alert("The order has been successfully " + data['orderStatus']+"!");
        });

        this._http.post(this._apiUrl + "/UpdateOrderStatus/addUpdateStatus",JSON.stringify(this.log[0]), reqopt).subscribe(function(res){
                this.response=res;
        });
        

    }//updateOrderStatus
     getDetails(id:any){
          var url = this._apiUrl + "/orderDetails/returnOrderDetails/"+ id;
        
         
        return this._http.get(url).map((res:Response) => res.json());
    }
}//Class