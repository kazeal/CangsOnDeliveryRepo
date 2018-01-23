import { Injectable } from '@angular/core';

import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { AnonymousSubscription } from "rxjs/Subscription";

@Injectable()
export class ProductService{
    filesToUpload: Array<File>;
    post: any;
    public static imgstring:string;
     private _apiUrl = 'http://192.168.0.24:41181';
    private _productUrl = 'http://192.168.0.24:41181/item/all';
    private _productAddUrl = 'http://192.168.0.24:41181/item/addItem';
    private _productEditUrl = 'http://192.168.0.24:41181/item/editItem';
    private _productDelUrl = 'http://192.168.0.24:41181/item/delItem';
   // base64Img = require('base64-img');
    constructor(private _http: Http){
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

      addItem(data:any,pic:File){
       // console.log(data);
       this.getBase64(pic["0"]);
       setTimeout (() => {
            //data["picture"]=this.getBase64(pic["0"]);
            
           // console.log(ProductService.imgstring);
            data["picture"]=ProductService.imgstring;
           // console.log(data);
            //console.log(data["picture"].length);
             let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })               //this._productAddUrl                       //
            
            this._http.post(this._productAddUrl,JSON.stringify(data), reqopt).subscribe(function(res){
                this.response=res;
                alert(this.response);
            });
                  
        }, 2000)
                 
       
        //FINISH UPLOAD


        /*
         this._http.post(this._productAddUrl,JSON.stringify(data), reqopt).subscribe(function(res){
             this.response=res;
             alert(this.response);
          });
        */  
        /*
         return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            console.log(data.picture["0"]);
            formData.append(data.itemName,data.itemQuantityStored,data.itemPrice,data.purchaseCount,data.picture["0"])
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", this._productAddUrl, true);
            xhr.send(formData);
        });
        */
 
       
          
     }
     editItem(data:any){
         
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqopt = new RequestOptions({
            headers: headers
        })
        
        
         this._http.post(this._productEditUrl,JSON.stringify(data), reqopt).subscribe(function(res){
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