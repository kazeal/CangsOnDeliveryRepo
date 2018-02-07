import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ItemRestoreComponent } from './itemrestore.component';

import { BlankPageComponent2 } from './blankPage.component2';
import { ItemRestoreService } from './itemrestore.service';
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
        ItemRestoreComponent,
        ItemFilterPipe,
         ],
    providers: [
		ItemRestoreService
	],
    exports: [ItemRestoreComponent,
              FormsModule,
              ReactiveFormsModule,
              CommonModule]
})

export class ItemRestoreModule { 
    
}
