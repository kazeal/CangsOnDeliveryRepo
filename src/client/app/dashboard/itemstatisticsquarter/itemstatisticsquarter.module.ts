import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemStatisticsQuarterComponent } from './itemstatisticsquarter.component';
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
        ItemStatisticsQuarterComponent,
        SafeHtml,
         ],
    providers: [
		ProductService
	],
    exports: [ItemStatisticsQuarterComponent, CommonModule]
})

export class ItemStatisticsQuarterModule { 
    
}
