import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgForm } from '@angular/forms'
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule, 
        CarouselModule, 
        FormsModule,
        HttpModule,
        ],
    declarations: [CustomerComponent],
    exports: [CustomerComponent]
})

export class CustomerModule { }
