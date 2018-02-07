import { Component, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { ItemRestoreService } from './itemrestore.service';
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

@Component({
	moduleId: module.id,
    selector: 'itemrestore-page',
    templateUrl: 'itemrestore.component.html',
}
)

export class ItemRestoreComponent implements OnInit, OnChanges{

    picture: FileList;
    picturestring: string;
	itemName:string;
	itemQuantityStored:number;
	itemPrice:number; 
    itemDescription:string;
    category:string='Food';
	purchaseCount:number =0;
	public itemID:number;
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
    public validpic:boolean =false;
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
    complexForm : FormGroup;
    valid:boolean=false;
    filter:string ='';
	 constructor(
         public Data: ItemRestoreService,
         private _http: HttpModule,
         private sanitizer:DomSanitizer,
         private chRef: ChangeDetectorRef,
         private zone: NgZone,
         public fb: FormBuilder,
         private location: Location,
         private _cookieService:CookieService,
           ){
               console.log("test13");
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
                  if(this._cookieService.get('4') == "true")
                    this.addItem=true;
                if(this._cookieService.get('5') == "true")
                    this.editItem=true;
                if(this._cookieService.get('6') == "true")
                    this.delItem=true;   
                    console.log(this._cookieService.getAll());
                        
        }
        load() {
            console.log(this.complexForm.controls);
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

        onSubmitRestore() { 
	
                this.data.push({
                    'itemID': this.itemID, 
                    'itemName': this.itemName, 
                    'itemQuantityStored': this.itemQuantityStored, 
                    'itemPrice': this.itemPrice,
                    'purchaseCountAllTime': this.purchaseCount,
                    'isDeleted': 0, 
                    'picture': this.picturestring,
                    'itemDescription': this.itemDescription,
                    'category': this.category, 
                     				
                });
                console.log(this.data[0]);
                this.Data.restoreItem(this.data[0]);
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
                document.getElementById('restore').style.display='none';
	
        }    
        ngOnInit() {
            this.refreshData();
        }
    
        private refreshData(): void {
            this.zone.run(() => {
            this.chRef.detectChanges();
            this.postsSubscription = this.Data.getProducts().subscribe(

            data  => {
                        console.log(this.items.data.length);
                        var i =0;
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
                                    console.log(test);
                            }
                        }
                        i=0;                          
                this.subscribeToData();
                console.log(this.items.data);
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
}



