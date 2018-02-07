import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustServiceComponent } from './custservice.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';

import { NgForm } from '@angular/forms'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmployeeFilterPipe } from './employee-pipe';
@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
         ],
    declarations: [
        CustServiceComponent,
        EmployeeFilterPipe,
        ],
    exports: [
        CustServiceComponent,
        FormsModule,
        ReactiveFormsModule,]
})

export class CustServiceModule { }
