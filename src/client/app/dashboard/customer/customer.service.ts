import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


//https://cangsapi.000webhostapp.com/index.php/Products/get_products  
@Injectable()
export class CustomerService{
    post: any;
    head = new Headers();
    requestOptions = new RequestOptions();
    private _apiUrl = 'http://192.168.1.153:1025';//192.168.0.24
    constructor(private _http: Http){}

    getCustomers(){
        return this._http.get(this._apiUrl + "/customer/all").map((res:Response) => res.json());
       
     }
     addCustomer(data:any, password:any){
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        }) 

        this._http.post(this._apiUrl + "/customer/addCustomer",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
            console.log(this.response._body);
            alert("Customer Successfully Added!\n" + "This is your username: " + this.response._body + "\nThis is your Temporary password: " + password + "\nThis is your Verification Code: " + data['verificationCode']);
        });
          
     }
     editCustomer(data:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        this._http.post(this._apiUrl + "/customer/editCustomer",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
            alert("Customer Successfully Updated!");
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
             alert("Customer Successfully Deleted!");
        });
          
     }   
}