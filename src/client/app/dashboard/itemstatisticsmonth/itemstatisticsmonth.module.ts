import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemStatisticsMonthComponent } from './itemstatisticsmonth.component';
import { SafeHtml } from './product-pipe';

import { ProductService } from '../item/product.service';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        
    ],
    declarations: [
        ItemStatisticsMonthComponent,
        SafeHtml,
         ],
    providers: [
		ProductService
	],
    exports: [ItemStatisticsMonthComponent, CommonModule]
})

export class ItemStatisticsMonthModule { 
    
}
