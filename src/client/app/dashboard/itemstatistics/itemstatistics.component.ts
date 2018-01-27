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


@Component({
	moduleId: module.id,
    selector: 'itemstatistics-page',
    templateUrl: 'itemstatistics.component.html',
}
)

export class ItemStatisticsComponent{

  
    public items: any= {data:[]};
    
	 constructor(
         public Data: ProductService,
         private _http: HttpModule,
         private sanitizer:DomSanitizer,
         private zone: NgZone,
         private location: Location
           ){
              
            this.Data.getItemStatistics().subscribe(data => {
                    zone.run(() => {
                        this.items.data=data;
                        console.log(this.items.data);
                        //alert("inside");
                        for(var i=0;i<this.items.data.length;i++)
                        this.items.data[i].picture="http://"+this.items.data[i].picture;
                        this.sanitizer.bypassSecurityTrustUrl(this.items.data[i].picture);
                        //this.items.data[i].picture=
                        console.log("latestest");
            
                    });
            });         

        }
}



