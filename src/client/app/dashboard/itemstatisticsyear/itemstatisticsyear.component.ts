import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { ProductService } from '../item/product.service';
import { CommonModule } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';
import { NgForm } from '@angular/forms'
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
	moduleId: module.id,
    selector: 'itemstatisticsyear-page',
    templateUrl: 'itemstatisticsyear.component.html',
}
)

export class ItemStatisticsYearComponent{

  
    public items: any= {data:[]};
    public data:any=[];
    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
	 constructor(
         public Data: ProductService,
         private _http: HttpModule,
         private sanitizer:DomSanitizer,
         private zone: NgZone,
         private chRef: ChangeDetectorRef,
         private location: Location
           ){
              
            this.Data.getItemStatisticsYear().subscribe(data => {
                    zone.run(() => {
                        this.items.data=data;
                        console.log(this.items.data);
                        //alert("inside");
                        for(var i=0;i<this.items.data.length;i++)
                        this.items.data[i].picture="http://"+this.items.data[i].picture;
                        this.sanitizer.bypassSecurityTrustUrl(this.items.data[i].picture);
                        //this.items.data[i].picture=
                        
            
                    });
            });      
            console.log("latestest13");   

    }
     ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.Data.getItemStatisticsYear().subscribe(

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
                                'purchaseCountYear': item.purchaseCountYear, 
                                'picture': item.picture, 	 	
                                 'itemDescription': item.itemDescription, 
                                'category': item.category, 				
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
            //console.log(this.items.data);
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
    export(){
        for(var i=0;i<this.items.data.length;i++)
        {
            this.data.push({
                "Item ID":this.items.data[i].itemID,
                "Item Name":this.items.data[i].itemName,
                "Item Description":this.items.data[i].itemDescription,
                "Item Price":this.items.data[i].itemPrice,
                "Item Category":this.items.data[i].category,
                "Item Purchase Count":this.items.data[i].purchaseCountYear,
            });
        }

        console.log(this.data);
         let time = new Date();
        
        let yy =time.getFullYear();
        var options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true, 
            showTitle: true,
            useBom: true,
            headers:['Item ID','Item Name','Item Description','Item Price','Item Category','Purchase Count','']
        };
         
       new Angular2Csv(this.data, 'Item Statistics for Year '+yy,options);
       this.data=[];
    }
}



