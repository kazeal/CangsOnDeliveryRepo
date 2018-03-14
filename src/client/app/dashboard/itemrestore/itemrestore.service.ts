import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { AnonymousSubscription } from "rxjs/Subscription";
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class ItemRestoreService{
    filesToUpload: Array<File>;
    post: any;
    public static imgstring:string;
    public static fileName:any;
    public log:any=[];
    
    // private _apiUrl = 'http://192.168.1.219:1025';//192.168.1.219:1025
     private _apiUrl = 'http://192.168.1.219:1025';//192.168.1.219:1025
   
    constructor(private _http: Http,private _cookieService:CookieService){
        //https://cangsapi.000webhostapp.com/index.php/Products/get_products
        this.filesToUpload = [];
    }
     
    getProducts(){ return this._http.get(this._apiUrl + "/item/restoreItem").map((res:Response) => res.json()); } 
    
    restoreItem(data:any){
         
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
        data['picture']=data['picture'].replace('http://','');
        let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + mn + ":" +ss;
        this.log.push({
            'logDate':timestamp,
            'logQuantity':data['itemQuantityStored'],
            'logPrice':data['itemPrice'],
            'itemID':data['itemID'],
            'employeeID':this._cookieService.get('employeeID'),
        });
        
        
        
        console.log(this.log[0]);
        console.log("test3");
         this._http.post(this._apiUrl + "/item/editItem",JSON.stringify(data), reqopt).subscribe(function(res){
             this.response=res;
             alert("The item has been successfully restored!");            
          });
         
          this._http.post(this._apiUrl + "/updateItem/addUpdateItem",JSON.stringify(this.log[0]), reqopt).subscribe(function(res){
                 this.response=res;
          });
          this.log.pop();
     }
    
}


