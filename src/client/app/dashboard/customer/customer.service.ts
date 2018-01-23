import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class CustomerService{
    post: any;
    head = new Headers();
    requestOptions = new RequestOptions();
    private _apiUrl = 'http://192.168.0.24:41181';
    private _customerAddUrl ='http://192.168.0.24:41181/customer/addCustomer';
    private _customerEditUrl ='http://192.168.0.24:41181/customer/editCustomer';
    private _customerDelUrl ='http://192.168.0.24:41181/customer/deleteCustomer';
    constructor(private _http: Http){
        //http://localhost:52282/customer/addCustomer
        //console.log("RUNNING");
        //https://cangsapi.000webhostapp.com/index.php/Products/get_products
         //this.getProducts();

    }
     
    getCustomers(){
        //
        return new Promise(resolve => {
          this._http.get(this._apiUrl + "/customer/all").map(res => res.json()).subscribe(data => {
          this.post = data;
          resolve(this.post);
          console.log(this.post);
        });
        }
     )};
     addCustomer(data:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        
        
         this._http.post(this._customerAddUrl,JSON.stringify(data), reqopt).subscribe(function(res){
             this.response=res;
             alert(this.response);
          });
          
     }
     editCustomer(data:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        
        
         this._http.post(this._customerEditUrl,JSON.stringify(data), reqopt).subscribe(function(res){
             this.response=res;
             alert(this.response);
          });
          
     }
      delCustomer(data:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        var url = this._apiUrl + "/customer/delete/"+ data.customerID;
        
         this._http.put(url,null, reqopt).subscribe(function(res){
             this.response=res;
             alert(this.response);
        });
          
     }
        /*
    getProducts(): Observable<Response>{
        console.log("INSIDE GET PRODUCTS");
        return this._http.get(this._productUrl)
                .map((response: Response) =>  <Response>response.json())
               .do( data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.handleError);

    }*/

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    
}