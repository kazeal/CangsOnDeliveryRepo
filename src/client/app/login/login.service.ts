import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';




@Injectable()
export class LoginService{
    post: any;
    public rights:any =[];
    private _apiUrl = 'http://192.168.0.24:1025';//192.168.0.24:1025
    constructor(private _http: Http ){
        console.log("LOGIN");
        
        //https://cangsapi.000webhostapp.com/index.php/Products/get_products
         //this.getProducts();

    }
     
    getEmployees(){ return this._http.get(this._apiUrl + "/employee/all").map((res:Response) => res.json()); }
     
     getRights(employeeID: any): any{

            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })
            
            var url = this._apiUrl + "/accessRights/getRights/"+ employeeID;
           
            return new Promise(resolve => {
            this._http.get(url).map(res => res.json()).subscribe(data => {
                this.post = data;
                resolve(this.post);
                console.log(this.post);
                 
                });
            }
            /*
            this._http.get(url,reqopt).subscribe(function(res){
                this.response=res;
                this.rights=this.reponse;
                alert(this.response);
            });
            return this.rights;
            */     
    )};
}
