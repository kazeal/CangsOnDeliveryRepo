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

@Component({
	moduleId: module.id,
    selector: 'item-page',
    templateUrl: 'item.component.html',
}
)

export class ItemComponent implements OnInit, OnChanges{

    picture: FileList;
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
    public items: any= {data:[]};
    public itemsnew: any= [];
    public validpic:boolean =false;
    filesToUpload: File; //192.168.0.24:1025/UploadFile/coco.jpg
    public picturetest:string ="https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header";
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
	 constructor(
         public Data: ProductService,
         private _http: HttpModule,
         private sanitizer:DomSanitizer,
         private chRef: ChangeDetectorRef,
         private zone: NgZone,
         public fb: FormBuilder,
         private location: Location,//FINISH ITEM ADD AND EDIT VALIDATION
           ){
               console.log("test9");
               var regex = new RegExp(/^\d+(?:\.\d{0,2})$/);/// //^-?[0-9]+(\.[0-9]+)?
               var regex2 = /^\d+(?:\.\d{0,2})$/;
               console.log(regex.test("123.123"));
                this.complexForm = fb.group({
                    'itemName' : [null, Validators.required],
                    'itemQuantityStored' : [null, Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern("[0-9][0-9 ]+")])],
                    'itemPrice': [null, Validators.compose([Validators.required, Validators.pattern("^\\d+(?:\\.\\d{2})$")])],
                // 'picture' : [null],
                })
                this.Data.getProducts().subscribe(data => {
                        zone.run(() => {
                            this.items.data=data;
                            console.log(this.items.data);
                            //alert("inside");
                            for(var i=0;i<this.items.data.length;i++)
                            this.items.data[i].picture="http://"+this.items.data[i].picture;
                            //this.sanitizer.bypassSecurityTrustUrl(this.items.data[i].picture);
                            //this.items.data[i].picture=
                            console.log("latestest");
                        });
                        
                });        
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
    load() {
        location.reload()
    }

    clean(){
        
        /*
           this.picture =null;
            this.picturestring="";
            this.itemName="";
            this.itemQuantityStored=null;
            this.itemPrice=null; 
            this.purchaseCount=0;
            this.itemID=null;
            */      
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
    }
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
        let file = this.picture[0];
        let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase(); 

        if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
           //this.complexForm.controls.picture._status
           console.log("test1");
           this.validpic=true;
        }
        else {
            fileInput.target.value = '';
            alert('Wrong file extension! Please Upload a Picture.');
            this.valid=false;
            this.validpic=false;
            console.log("test4");
            
        }
        if(!this.complexForm.valid)
        {
            console.log("test2");
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
              console.log("test3");
        }
        else
        this.valid=false; 
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
            this.data.pop();
            this.picture =null;
            this.picturestring="";
            this.itemName="";
            this.itemQuantityStored=null;
            this.itemPrice=null; 
            this.purchaseCount=0;
            this.itemID=null;
           
	
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
        
                
                //console.log(this.data[0]);
                console.log("why");
               // this.Data.addItem(this.data[0],this.picture); 
                
                //this.fileName=this.Data.addPicture(this.picture);
               
               
                this.data.push({
                    'itemName': this.itemName, 
                    'itemQuantityStored': this.itemQuantityStored, 
                    'itemPrice': this.itemPrice,
                    'purchaseCount': 0, 
                    'picture': "fileName", 
                   			
                });
                    this.Data.addItem(this.data[0],this.picture);   
                    //console.log(this.fileName);
                console.log(this.data[0]);
                this.data.pop();
                this.picture =null;
                this.picturestring="";
                this.itemName="";
                this.itemQuantityStored=null;
                this.itemPrice=null; 
                this.purchaseCount=0;
                this.itemID=null;
               /* 
                setTimeout (() => {
                location.reload();
            }, 5000)
            */
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
    }
    ngOnChanges(changes:any) {
        console.log(changes);
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
            //this.items.data = data;
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



