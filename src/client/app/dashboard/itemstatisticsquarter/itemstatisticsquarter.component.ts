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
    selector: 'itemstatisticsquarter-page',
    templateUrl: 'itemstatisticsquarter.component.html',
}
)

export class ItemStatisticsQuarterComponent{

  
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
              
            this.Data.getItemStatisticsQuarter().subscribe(data => {
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
        this.postsSubscription = this.Data.getItemStatisticsQuarter().subscribe(

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
                                'purchaseCountQuarter': item.purchaseCountQuarter, 
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
    export(){
        for(var i=0;i<this.items.data.length;i++)
        {
            this.data.push({
                "Item ID":this.items.data[i].itemID,
                "Item Name":this.items.data[i].itemName,
                "Item Description":this.items.data[i].itemDescription,
                "Item Price":this.items.data[i].itemPrice,
                "Item Category":this.items.data[i].category,
                "Item Purchase Count":this.items.data[i].purchaseCountQuarter,
            });
        }
         let time = new Date();
        let mm =time.getMonth();
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
       let quarter="0";
       if(mm > 0 && mm <2)
       quarter="1st";
       else if(mm>2 && mm <6) 
       quarter="2nd";
       else if(mm>6 && mm <8) 
       quarter="3rd";
       else if(mm>9 && mm <12) 
       quarter="4th";
       new Angular2Csv(this.data, 'Item Statistics for '+quarter +' quarter of ' +yy,options);
       this.data=[];
    }
     resetQuarter(){
        this.Data.resetQuarter();
    }
}



