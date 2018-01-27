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
    public log:any=[];//logquantity,logdate,logprice,itemid,employeeid
    private uploadURL = 'http://192.168.0.24:1025/item/uploadFile';
     private _apiUrl = 'http://192.168.0.24:1025';
    private _productUrl = 'http://192.168.0.24:1025/item/all';
    private _productStatisticsUrl = 'http://192.168.0.24:1025/item/itemStatistics';
    private _productAddUrl = 'http://192.168.0.24:1025/item/addItem';
    private _productEditUrl = 'http://192.168.0.24:1025/item/editItem';
    private _productUpdateUrl = 'http://192.168.0.24:1025/updateItem/addUpdateItem';
    private _productDelUrl = 'http://192.168.0.24:1025/item/delItem';
   // base64Img = require('base64-img');
    constructor(private _http: Http,private _cookieService:CookieService){
        //console.log("RUNNING");
        //https://cangsapi.000webhostapp.com/index.php/Products/get_products
         //this.getProducts();
         this.filesToUpload = [];

    }
     
    getProducts(){
         return this._http.get(this._productUrl).map((res:Response) => res.json());
        /*
        return new Promise(resolve => {
          return this._http.get(this._productUrl).map(res => res.json()).subscribe(data => {
          this.post = data;
          resolve(this.post);
          console.log(this.post);
        });
        }
    */
}
    getItemStatistics(){
            return this._http.get(this._productStatisticsUrl).map((res:Response) => res.json());
            /*
            return new Promise(resolve => {
            return this._http.get(this._productUrl).map(res => res.json()).subscribe(data => {
            this.post = data;
            resolve(this.post);
            console.log(this.post);
            });
            }
        */
        }
     private pause() {
        setTimeout (() => {
        console.log("Hello from setInterval");
        }, 2000)
     }
      getBase64(file : File ){
             var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
               // console.log(reader);
               // console.log(typeof reader.result); 
                ProductService.imgstring=reader.result.split(',')[1];           
                //console.log(this.imgstring);
            }.bind(this);
            reader.onerror = function (error) {
                console.log('Error: ', error);
                
            };
            
            
      }
      addPicture(pic:FileList){

            console.log(pic);
            
                if(pic.length > 0) {
                let file: File = pic[0];
                let formData:FormData = new FormData();
                console.log(file);
                
                formData.append('uploadFile', file, file.name);
                let headers = new Headers();            
                //headers.append('Content-Type', 'multipart/form-data');
               
                //headers.append('Content-Type', 'application/x-www-form-urlencoded');
               // headers.append('Accept', 'application/json');
                let options = new RequestOptions({ headers: headers });//https://httpbin.org/post
                console.log(formData);
                this._http.post(this.uploadURL, formData, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(error))
                    .subscribe(
                        data => ProductService.fileName=data,
                        error => console.log(error)
                    )
                }
           

      }

      addItem(data:any,pic:FileList){
       // console.log(data);
      // this.getBase64(pic["0"]);
       this.addPicture(pic);
       setTimeout (() => {
           console.log(ProductService.fileName);
            data["picture"]="192.168.0.24:1025/UploadFile/"+ProductService.fileName;
           // ProductService.fileName=null;
           // console.log(ProductService.imgstring);
           // data["picture"]=ProductService.imgstring;
           // console.log(data);
            //console.log(data["picture"].length);
            console.log(data);
             let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })               //this._productAddUrl                       //
            
            this._http.post(this._productAddUrl,JSON.stringify(data), reqopt).subscribe(function(res){
                this.response=res;
                alert(this.response);
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
        let ss =time.getSeconds();
        data['picture']=data['picture'].replace('http://','');
        let timestamp=mm+1 + "/" + dd + "/" + yy + " " + hh + ":" + ss;
        this.log.push({
            'logDate':timestamp,
            'logQuantity':data['itemQuantityStored'],
            'logPrice':data['itemPrice'],
            'itemID':data['itemID'],
            'employeeID':this._cookieService.get('employeeID'),
        });
        
        
        
        console.log(this.log);
        console.log("test3");
       
         this._http.post(this._productEditUrl,JSON.stringify(data), reqopt).subscribe(function(res){
             this.response=res;
             alert(this.response);            
          });
         
          this._http.post(this._productUpdateUrl,JSON.stringify(this.log[0]), reqopt).subscribe(function(res){
                 this.response=res;
                 alert(this.response);
          });
     }
      delItem(data:any){
         
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })

        var url = this._apiUrl + "/item/deleteItem/"+ data;
        
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


