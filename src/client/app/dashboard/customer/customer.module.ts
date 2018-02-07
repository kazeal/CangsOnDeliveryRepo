import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { CustomerFilterPipe } from './customer-pipe';

@NgModule({
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        CarouselModule, 
        FormsModule,
        HttpModule,
        ],
    declarations: [
        CustomerComponent,
        CustomerFilterPipe,	
       
        ],
    exports: [CustomerComponent , 
              FormsModule,
              CustomerFilterPipe,
              ReactiveFormsModule,
              CommonModule
              ]
})

export class CustomerModule { }
