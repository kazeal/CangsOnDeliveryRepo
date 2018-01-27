import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemStatisticsComponent } from './itemstatistics.component';
import { SafeHtml } from './product-pipe';

import { ProductService } from './product.service';
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
        ItemStatisticsComponent,
        SafeHtml,
         ],
    providers: [
		ProductService
	],
    exports: [ItemStatisticsComponent, CommonModule]
})

export class ItemStatistics { 
    
}
