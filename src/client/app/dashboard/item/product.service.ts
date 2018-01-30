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
export class ProductService{
    filesToUpload: Array<File>;
    post: any;
    public static imgstring:string;
    public static fileName:any;
    public log:any=[];
    
     private _apiUrl = 'http://192.168.0.24:1025';//192.168.0.24:1025
   
    constructor(private _http: Http,private _cookieService:CookieService){
        //https://cangsapi.000webhostapp.com/index.php/Products/get_products
        this.filesToUpload = [];
    }
     
    getProducts(){ return this._http.get(this._apiUrl + "/item/all").map((res:Response) => res.json()); } 
    getItemStatistics(){ return this._http.get(this._apiUrl + "/item/itemStatistics").map((res:Response) => res.json()); }
    addPicture(pic:FileList){
           // console.log(pic);
            if(pic.length > 0) {
            let file: File = pic[0];
            let formData:FormData = new FormData();
            //console.log(file);      
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();            
            //headers.append('Content-Type', 'multipart/form-data');     
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');
            // headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });//https://httpbin.org/post
            console.log(formData);
            this._http.post(this._apiUrl + "/item/uploadFile", formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => ProductService.fileName=data,
                    error => console.log(error)
                )
            }
    }
    addItem(data:any,pic:FileList){
       this.addPicture(pic);
       setTimeout (() => {
           console.log(ProductService.fileName);
            data["picture"]="192.168.0.24:1025/UploadFile/"+ProductService.fileName;
            console.log(data);
             let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })              
            
            this._http.post(this._apiUrl + "/item/addItem",JSON.stringify(data), reqopt).subscribe(function(res){
                this.response=res;
                alert("Item Added Sucessfully!");
            });
                  
        }, 3000)                    
    }
    editItem(data:any){
         
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
             alert("Item Successfully Edited!");            
          });
         
          this._http.post(this._apiUrl + "/updateItem/addUpdateItem",JSON.stringify(this.log[0]), reqopt).subscribe(function(res){
                 this.response=res;
                 
          });
          this.log.pop();
     }
     delItem(data:any){
         
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        var url = this._apiUrl + "/item/deleteItem"+ data;
        
         this._http.put(url,null, reqopt).subscribe(function(res){
             this.response=res;
             alert("Item Successfully Deleted!");
        });
          
     }
    
}


