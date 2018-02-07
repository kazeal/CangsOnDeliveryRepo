import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemStatisticsYearComponent } from './itemstatisticsyear.component';
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
        ItemStatisticsYearComponent,
        SafeHtml,
         ],
    providers: [
		ProductService
	],
    exports: [ItemStatisticsYearComponent, CommonModule]
})

export class ItemStatisticsYearModule { 
    
}
