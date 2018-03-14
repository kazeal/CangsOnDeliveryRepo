import { Component, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';
import { NgForm } from '@angular/forms'
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ItemRestoreService } from '../itemrestore/itemrestore.service';
@Component({
	moduleId: module.id,
    selector: 'item-page',
    templateUrl: 'item.component.html',
}
)

export class ItemComponent implements OnInit, OnChanges{

    inside:boolean=false;
    header:any;
    sticky:any;
    picture: FileList;
    picturestring: string;
	itemName:string;
	itemQuantityStored:number;
	itemPrice:number; 
    itemDescription:string;
    category:string='Dry Goods';
	purchaseCount:number =0;
	public itemID:number;
    verify:boolean=true;
	i:number=0;
    editItem=false;
    addItem=false;
    delItem=false;
    display='sampletext';
	public user: any =[];
	public data: any= [];
	public customers: any= [];
    public items: any= {data:[]};
    public itemsnew: any= [];
    public itemsdeleted:any={data:[]};
    public validpic:boolean =false;
    public notif:any=[];
    filesToUpload: File; //192.168.0.24:1025/UploadFile/coco.jpg
    public fileName:any;
    public test:any = [{
				'itemID': 1, 
				'itemName': "test", 
				'itemQuantityStored': 1, 
				'itemPrice': 1,
				'purchaseCount': 1, 
				'picture': "test", 				
	}];
    public teststring:any;
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;//FIX RELOAD DATA
    private timerSubscription2: AnonymousSubscription;
    private postsSubscription2: AnonymousSubscription;//FIX RELOAD DATA
    complexForm : FormGroup;
    valid:boolean=false;
    filter:string ='';
	 constructor(
         public Data: ProductService,
         public Data2: ItemRestoreService,
         private _http: HttpModule,
         private sanitizer:DomSanitizer,
         private chRef: ChangeDetectorRef,
         private zone: NgZone,
         public fb: FormBuilder,
         private location: Location,
         private _cookieService:CookieService,
           ){
              
               var regex = new RegExp(/^\d+(?:\.\d{0,2})$/);
               var regex2 = /^\d+(?:\.\d{0,2})$/;
               console.log(regex.test("123.123"));
                this.complexForm = fb.group({
                    'itemName' : [null, Validators.required],
                    'itemQuantityStored' : [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern("[0-9 ]+")])],
                    'itemPrice': [null, Validators.compose([Validators.required, Validators.pattern("^\\d+(?:\\.\\d{2})$")])],
                    'itemDescription': [null, Validators.required],
                            
                })
                this.Data.getProducts().subscribe(data => {
                        zone.run(() => {
                            this.items.data=data;
                            console.log(this.items.data);              
                            for(var i=0;i<this.items.data.length;i++)
                            this.items.data[i].picture="http://"+this.items.data[i].picture;
                            //this.sanitizer.bypassSecurityTrustUrl(this.items.data[i].picture);                       
                        });
                        
                });        
                this.Data2.getProducts().subscribe(data => {
                        zone.run(() => {
                            this.itemsdeleted.data=data;
                            console.log(this.itemsdeleted.data);              
                            for(var i=0;i<this.itemsdeleted.data.length;i++)
                            this.itemsdeleted.data[i].picture="http://"+this.itemsdeleted.data[i].picture;
                            //this.sanitizer.bypassSecurityTrustUrl(this.items.data[i].picture);                       
                        });
                        
                }); 
                 if(this._cookieService.get('4') == "true")
                    this.addItem=true;
                if(this._cookieService.get('5') == "true")
                    this.editItem=true;
                if(this._cookieService.get('6') == "true")
                    this.delItem=true;   
                    console.log(this._cookieService.getAll());
                     console.log("test16");
        }
        load() {
            console.log(this.complexForm.controls);
        }
        onChangeCategory(){
            this.verify=false;
        }
        clean(){
            document.getElementById("picture").value = "";
            this.filter="";
            this.itemDescription="";
            this.category="Dry Goods";
            this.picture =null;
            this.picturestring="";
            this.itemName="";
            this.itemQuantityStored=null;
            this.itemPrice=null; 
            this.purchaseCount=0;
            this.itemID=null;
            this.verify=true;
           
            /*
            this.Data.getProducts().subscribe(data => {
                 console.log(this.items.data.length);
                  var i =0;
                  for (let item of data)
                  {
                        if(item.picture.substring(0,2) != "http://")
                        {
                            item.picture="http://"+item.picture;
                        }
                        
                        //data[0].picture=this.sanitizer.bypassSecurityTrustUrl(data[0].picture);
                        //console.log(data);
                        this.items.data[i]=({
                            'itemID': item.itemID, 
                            'itemName': item.itemName, 
                            'itemQuantityStored': item.itemQuantityStored, 
                            'itemPrice': item.itemPrice,
                            'purchaseCount': item.purchaseCount, 
                            'picture': item.picture, 				
                        });
                        i=i+1;//FINISH REFRESH DATA AND ERROR TRAPPING FOR ITEM PRICE
                         
                        //console.log(item);
                        //console.log(i);
                   }
                   if(i < this.items.data.length)
                   {
                       let dif = this.items.data.length - i;
                       let test;
                       for(dif;dif>0;dif--)
                       {
                            test=this.items.data.pop();
                            console.log(test);
                       }
                   }
                   i=0;   
                   // console.log(this.items.data);                
                   // console.log("latestest");      
                   
                });  
                */
        }
        clickdel(event:any,id:any,iname:string){
            this.itemID=id;
            this.itemName=iname;
            console.log(this.items);
	    }
        clickedit(event:any,id:any,iname:string,istored:number,iprice:number,pcount:number,pic:any,desc:string,cat:string){
	
            this.picturestring=pic;
            this.itemID=id;
            this.itemName=iname;
            this.itemQuantityStored=istored;
            this.itemPrice=iprice;
            this.purchaseCount=pcount;
            this.itemDescription=desc;
            this.category=cat;
	    }
        onChange(fileInput: any)
        {
            this.picture = fileInput.target.files;
            let file = this.picture[0];
            let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase(); 

            if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
            //this.complexForm.controls.picture._status
           
           // console.log("test1");
            this.validpic=true;
            }
            else {
                fileInput.target.value = '';
                alert('Wrong file extension! Please upload a picture.');
                this.valid=false;
                this.validpic=false;
             //   console.log("test4");
                
            }
            if(!this.complexForm.valid)
            {
               // console.log("test2");
                console.log(this.complexForm.controls);
            }
            if(fileInput.target.value == '')
            this.valid=true;
            if(this.validpic && this.complexForm.get('itemName').status == "VALID" && this.complexForm.get('itemPrice').status == "VALID" && this.complexForm.get('itemQuantityStored').status == "VALID")
            {
                console.log(this.complexForm.get('itemName').status);
                console.log(this.complexForm.get('itemQuantityStored').status);
                console.log(this.complexForm.get('itemPrice').status);
                this.valid=true;
              //  console.log("test3");
            }
            else
            this.valid=false; 
        }

        onSubmitEdit() { 
                this.verify=true;
                this.data.push({
                    'itemID': this.itemID, 
                    'itemName': this.itemName, 
                    'itemQuantityStored': this.itemQuantityStored, 
                    'itemPrice': this.itemPrice,
                    'purchaseCount': this.purchaseCount, 
                    'picture': this.picturestring,
                    'itemDescription': this.itemDescription,
                    'category': this.category, 
                     				
                });
                console.log(this.data[0]);
                this.Data.editItem(this.data[0]);
                this.data.pop();
                this.picture =null;
                this.picturestring="";
                this.itemName="";
                this.itemQuantityStored=null;
                this.itemPrice=null; 
                this.purchaseCount=0;
                this.itemID=null;
                this.itemDescription="";
                this.category="";
                this.filter="";
                document.getElementById('edit').style.display='none';
	
        }
        onSubmitAdd() {  
                var found=false;
                var name= this.itemName;
                for(var i=0;i<this.items.data.length;i++)
                {
                    if(name.toLowerCase()==this.items.data[i].itemName.toLowerCase())
                    {
                         found=true;
                    }
                }
                for(var i=0;i<this.itemsdeleted.data.length;i++)
                {
                    if(name.toLowerCase()==this.itemsdeleted.data[i].itemName.toLowerCase())
                    {
                         found=true;
                    }
                }
                if(!found)
                {
                    this.data.push({
                        'itemName': this.itemName, 
                        'itemQuantityStored': this.itemQuantityStored, 
                        'itemPrice': this.itemPrice,
                        'purchaseCountAllTime': 0, 
                        'picture': "fileName",
                        'itemDescription': this.itemDescription,
                        'category': this.category, 
                                
                    });
                    this.Data.addItem(this.data[0],this.picture);   
                    console.log(this.data[0]);
                    this.data.pop();
                    this.picture =null;
                    this.picturestring="";
                    this.itemName="";
                    this.itemDescription="";
                    this.category="";
                    this.itemQuantityStored=null;
                    this.itemPrice=null; 
                    this.purchaseCount=0;
                    this.complexForm.reset();
                    this.filter="";
                    document.getElementById('add').style.display='none';
                }
                else
                {
                    alert("This item already exist. \nPlease use a different item name.")
                }
           
        }
        onSubmitDel() {
         
                //console.log(this.data[0]);
                this.Data.delItem(this.itemID);
                this.picture =null;
                this.picturestring="";
                this.itemName="";
                this.itemQuantityStored=null;
                this.itemPrice=null; 
                this.purchaseCount=0;
                this.itemID=null;
                 this.itemDescription="";
                this.category="";
                this.filter="";
                document.getElementById('del').style.display='none';
        }
        ngOnChanges(changes:any) {
               // console.log(changes);
                if(this.validpic && this.complexForm.get('itemName').status == "VALID" && this.complexForm.get('itemPrice').status == "VALID" && this.complexForm.get('itemQuantityStored').status == "VALID")
                {
                    console.log(this.complexForm.get('itemName').status);
                    console.log(this.complexForm.get('itemQuantityStored').status);
                    console.log(this.complexForm.get('itemPrice').status);
                    this.valid=true;
                }
                else
                this.valid=false; 
        }
        ngOnInit() {
            this.refreshData();
            this.refreshData2();
        }
    
        private refreshData(): void {
            this.zone.run(() => {
            this.chRef.detectChanges();
            this.postsSubscription = this.Data.getProducts().subscribe(

            data  => {
                       // console.log(this.items.data.length);
                        var i =0;
                        for (let item of data)
                        {
                                if(item.itemQuantityStored < 20)
                                {
                                //    console.log("INSIDE <20");
                                    for(var v=0;v<this.notif.length;v++)
                                    {
                                        if(this.notif[v].itemID == item.itemID)
                                        {
                                            this.inside=true;
                                            console.log(item.itemName);
                                            
                                        }
                                   //     console.log("INSIDE SEARCH");
                                      //  console.log(this.inside);
                                    }
                                    if(!this.inside)
                                    {
                                         //   console.log("ADDDED TO NOTIF");
                                            if(item.picture.substring(0,2) != "http://")
                                            {
                                                item.picture="http://"+item.picture;
                                            }                           
                                            this.notif[i]=({
                                                'itemID': item.itemID, 
                                                'itemName': item.itemName, 
                                                'itemQuantityStored': item.itemQuantityStored, 
                                                'itemPrice': item.itemPrice,
                                                'purchaseCountAllTime': item.purchaseCountAllTime, 
                                                'picture': item.picture, 
                                                'itemDescription': item.itemDescription,
                                                'category': item.category,
                                                'display': false,				
                                            });
                                            i=i+1;
                                           // this.inside=false;
                                    }
                                    this.inside=false;
                                }
                                else
                                {
                                   // console.log("INELSE <20");
                                    for(var m=0;m<this.notif.length;m++)
                                    {
                                        if(this.notif[m].itemID == item.itemID)
                                        {
                                     //       console.log("REMOVED <20");
                                            this.notif.splice(m,1);
                                        }
                                    }

                                }
                        }
                        for (let item of data)
                        {
                                if(item.picture.substring(0,2) != "http://")
                                {
                                    item.picture="http://"+item.picture;
                                }                           
                                this.items.data[i]=({
                                    'itemID': item.itemID, 
                                    'itemName': item.itemName, 
                                    'itemQuantityStored': item.itemQuantityStored, 
                                    'itemPrice': item.itemPrice,
                                    'purchaseCountAllTime': item.purchaseCountAllTime, 
                                    'picture': item.picture, 
                                    'itemDescription': item.itemDescription,
                                    'category': item.category,				
                                });
                                i=i+1;
                        }
                        if(i < this.items.data.length)
                        {
                            let dif = this.items.data.length - i;
                            let test;
                            for(dif;dif>0;dif--)
                            {
                                    test=this.items.data.pop();
                                 //   console.log(test);
                            }
                        }
                        i=0;                          
                this.subscribeToData();
              //  console.log(this.notif);
               console.log(this.items.data);
                for(var b=0;b<this.notif.length;b++)
                {
                    if(!this.notif[b].display)
                    {
                        alert("WARNING: Your stock on the item "+ this.notif[b].itemName+" is running low.");
                        this.notif[b].display=true;
                    }
                    
                }
            },
            function (error) {
                console.log(error);
            },
            function () {
                console.log("complete");
            }
            );
            });
        }
        private subscribeToData(): void {

                this.timerSubscription = Observable.timer(3000)
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

          private refreshData2(): void {
            this.zone.run(() => {
            this.chRef.detectChanges();
            this.postsSubscription2 = this.Data2.getProducts().subscribe(

            data  => {
                        console.log(this.itemsdeleted.data.length);
                        var i =0;
                        for (let item of data)
                        {
                                if(item.picture.substring(0,2) != "http://")
                                {
                                    item.picture="http://"+item.picture;
                                }                           
                                this.itemsdeleted.data[i]=({
                                    'itemID': item.itemID, 
                                    'itemName': item.itemName, 
                                    'itemQuantityStored': item.itemQuantityStored, 
                                    'itemPrice': item.itemPrice,
                                    'purchaseCountAllTime': item.purchaseCountAllTime, 
                                    'picture': item.picture, 
                                    'itemDescription': item.itemDescription,
                                    'category': item.category,				
                                });
                                i=i+1;
                        }
                        if(i < this.itemsdeleted.data.length)
                        {
                            let dif = this.itemsdeleted.data.length - i;
                            let test;
                            for(dif;dif>0;dif--)
                            {
                                    test=this.itemsdeleted.data.pop();
                                    console.log(test);
                            }
                        }
                        i=0;                          
                this.subscribeToData2();
                console.log(this.itemsdeleted.data);
            },
            function (error) {
                console.log(error);
            },
            function () {
               // console.log("complete");
            }
            );
            });
        }
        private subscribeToData2(): void {

                this.timerSubscription2 = Observable.timer(3000)
                .subscribe(() => this.refreshData2());
        }
        public ngOnDestroy2(): void {

                if (this.postsSubscription2) {
                this.postsSubscription2.unsubscribe();
                }
                if (this.timerSubscription2) {
                this.timerSubscription2.unsubscribe();
                }
        }   

}



