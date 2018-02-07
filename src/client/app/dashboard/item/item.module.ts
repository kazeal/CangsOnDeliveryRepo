import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemComponent } from './item.component';

import { BlankPageComponent2 } from './blankPage.component2';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemFilterPipe } from './product-pipe';
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        ItemComponent,
        ItemFilterPipe,
         ],
    providers: [
		ProductService
	],
    exports: [ItemComponent,
              FormsModule,
              ReactiveFormsModule,
              CommonModule]
})

export class ItemModule { 
    
}
