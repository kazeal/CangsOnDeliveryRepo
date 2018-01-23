import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemComponent } from './item.component';
import { SafeHtml } from './product-pipe';
import { BlankPageComponent2 } from './blankPage.component2';
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
        ItemComponent,
        BlankPageComponent2,
        SafeHtml,
         ],
    providers: [
		ProductService
	],
    exports: [ItemComponent, BlankPageComponent2, CommonModule]
})

export class ItemModule { 
    
}
