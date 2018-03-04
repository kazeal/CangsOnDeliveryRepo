import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { CookieService } from 'angular2-cookie/services/cookies.service';

//https://cangsapi.000webhostapp.com/index.php/Products/get_products  
@Injectable()
export class CustomerService{
    post: any;
    head = new Headers();
    public log:any=[];
    requestOptions = new RequestOptions();
  //  private _apiUrl = 'http://192.168.1.219:1025';//192.168.0.24
    private _apiUrl = 'http://192.168.0.24:1025';//192.168.0.24
    constructor(private _http: Http,private _cookieService:CookieService){}

    getCustomers(){
        return this._http.get(this._apiUrl + "/customer/all").map((res:Response) => res.json());
       
     }
     getCustomer(customer:any){
        return this._http.get(this._apiUrl + "/customer/getCustomer/"+customer).map((res:Response) => res.json());
       
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
            alert("Customer has been successfully added!\n" + "This is your username: " + this.response._body + "\nThis is your temporary password: " + password + "\nThis is your Verification Code: " + data['verificationCode']);
        });
          
     }
     editCustomer(data:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        let time = new Date();
        console.log(time);
        let mm =time.getMonth();
        let dd =time.getDate();
        let yy =time.getFullYear();
        let hh =time.getHours();
        let mn =time.getMinutes();
        let ss =time.getSeconds();
        let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + mn + ":" +ss;
        this.log.push({
            'cusLogNumber':data['number'],
            'cusLogAddress':data['address'],
            'cusLogLastName':data['cusLastName'],
            'cusLogFirstName':data['cusFirstName'],
            'cusLogMiddleName':data['cusMiddleName'],
            'cusLogTime':timestamp,
            'employeeID':this._cookieService.get('employeeID'),
            'customerID':data['customerID'],
        });
        console.log(this.log[0]);
        this._http.post(this._apiUrl + "/customer/editCustomer",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
            alert("The customer has been successfully updated!");
        });
         this._http.post(this._apiUrl + "/customerLog/customerLog",JSON.stringify(this.log[0]), reqopt).subscribe(function(res){
                 this.response=res;    
        });
        this.log.pop();

        
          
     }//logID,cusLogNumber,cusLogAddress,cusLogLastName,cusLogFirstName,cusLogMiddleName,cusLogTime,employeeID,customerID
     resetPass(data:any,pass:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        this._http.post(this._apiUrl + "/customer/editCustomer",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
            alert("The customer password is successfully resetted!\nThe new temporary password is: "+pass);
        });
          
     }
     resetCode(data:any,code:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        this._http.post(this._apiUrl + "/customer/editCustomer",JSON.stringify(data), reqopt).subscribe(function(res){
            this.response=res;
            alert("The customer verification code is successfully resetted!\nThe new verification code is: "+code);
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
             alert("The customer has been successfully deleted!");
        });
          
     }   
}