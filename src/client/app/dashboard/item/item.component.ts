import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';
import { NgForm } from '@angular/forms'
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { NgZone } from '@angular/core';
@Component({
	moduleId: module.id,
    selector: 'item-page',
    templateUrl: 'item.component.html'
}
)

export class ItemComponent implements OnInit{

    picture: File;
    picturestring: string;
	itemName:string;
	itemQuantityStored:number;
	itemPrice:number; 
	purchaseCount:number =0;
	public itemID:number;
	i:number=0;
    display='sampletext';
	public user: any =[];
	public data: any= [];
	public customers: any= [];
    public items: any= [];
    public itemsnew: any= [];
    filesToUpload: File;
    public picturetest:string;
    public test:any = [{
				'itemID': 1, 
				'itemName': "test", 
				'itemQuantityStored': 1, 
				'itemPrice': 1,
				'purchaseCount': 1, 
				'picture': "test", 				
		}];
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;


	 constructor(public Data: ProductService, private _http: HttpModule, private ngzone:NgZone){
         this.Data.getProducts().subscribe(data => this.items=data);
         console.log(this.items);
        // console.log("new");
        // console.log(ngzone.runOutsideAngular);


         /*
		  this.Data.getProducts().then(result => {
          this.items=result;
        //  console.log(this.items[0].picture);
          this.items[0].picture=this.items[0].picture.replace(" ","+")//.split(' ').join(''); */
         // console.log("splitted");
        //  console.log(this.items[0].picture.length);
        //  console.log("test");
         // console.log(this.items[0]);
        /*
        var byteCharacters = atob(this.items[0].productPic);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray]);
         console.log(byteArray);
         */
       // });
        
    }
    clean(){
        this.picture ="";
        this.picturestring: string;
        this.itemName:string;
        this.itemQuantityStored:number;
        this.itemPrice:number; 
        this.purchaseCount:number =0;
        this.itemID='';
    }//FINISH ADD REMOVING INITIAL VARIABLES AND REFRESH DATA
    clickdel(event:any,id:any,iname:string){
	//	console.log(id);
		this.itemID=id;
        this.itemName=iname;
       // console.log(this.test);
        /*
        this.items.push({
				'itemID': this.test[0].itemID, 
				'itemName': this.test[0].itemName, 
				'itemQuantityStored': this.test[0].itemQuantityStored, 
				'itemPrice': this.test[0].itemPrice,
				'purchaseCount': this.test[0].purchaseCount, 
				'picture': this.test[0].picture, 				
		});
        */
		console.log(this.items);
	}
    clickedit(event:any,id:any,iname:string,istored:number,iprice:number,pcount:number,pic:any){
	//	console.log(id);
		this.picturestring=pic;
        this.itemID=id;
		this.itemName=iname;
		this.itemQuantityStored=istored;
		this.itemPrice=iprice;
		this.purchaseCount=pcount;
		//console.log(id);
	}

    onClose(){
        /*
          if(this.itemsnew.length != 0)
          {
                console.log("latest");
                console.log(this.items);
                console.log(this.itemsnew);    
                this.items.push({
                    'itemID': this.itemsnew[this.itemsnew.length-1].itemID, 
                    'itemName': this.itemsnew[this.itemsnew.length-1].itemName, 
                    'itemQuantityStored': this.itemsnew[this.itemsnew.length-1].itemQuantityStored, 
                    'itemPrice': this.itemsnew[this.itemsnew.length-1].itemPrice,
                    'purchaseCount': this.itemsnew[this.itemsnew.length-1].purchaseCount, 
                    'picture': this.itemsnew[this.itemsnew.length-1].picture, 				
                });
                console.log(this.items);

          }
          return;
          */
            
    }

     onChange(fileInput: any)
    {
       this.picture = fileInput.target.files;
       //this.picture=element.value;
       console.log(element);
    }

    onSubmitEdit() { 
	
			this.data.push({
				'itemID': this.itemID, 
				'itemName': this.itemName, 
				'itemQuantityStored': this.itemQuantityStored, 
				'itemPrice': this.itemPrice,
				'purchaseCount': this.purchaseCount, 
				'picture': this.picturestring, 				
			});
			console.log(this.data[0]);
			this.Data.editItem(this.data[0]);

           
	
    }
     getBase64(file : File ){
             var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
               // console.log(reader);
               // console.log(typeof reader.result);.split(',')[1]
                this.picturetest=reader.result;           
                //console.log(this.imgstring);
            }.bind(this);
            reader.onerror = function (error) {
                console.log('Error: ', error);
                
            };
            
            
      }

    onSubmitAdd() {  
           // console.log(this.itemName);
        
                this.data.push({
                    'itemName': this.itemName, 
                    'itemQuantityStored': this.itemQuantityStored, 
                    'itemPrice': this.itemPrice,
                    'purchaseCount': this.purchaseCount, 
                    'picture': "asd", 
                   			
                });
                //console.log(this.data[0]);
                console.log("why");
                this.Data.addItem(this.data[0],this.picture);            
    }

    onSubmitDel() {
         
        //console.log(this.data[0]);
        this.Data.delItem(this.itemID);
    }

     ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
        this.postsSubscription = this.Data.getProducts().subscribe(

        data  => {
            this.items = data;
            this.subscribeToData();
            console.log(this.items);
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log("complete");
        }
        );
    }
    private subscribeToData(): void {

        this.timerSubscription = Observable.timer(5000)
            .subscribe(() => this.refreshData());
    }
     public ngOnDestroy(): void {

            if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
            }
            if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            }
    }
    
}



