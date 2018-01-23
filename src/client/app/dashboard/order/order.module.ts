import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
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
    declarations: [OrderComponent],
    exports: [OrderComponent]
})

export class OrderModule { }
