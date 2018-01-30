import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        ReactiveFormsModule,
        FormsModule,
         ],
    declarations: [AdminComponent],
    exports: [
        AdminComponent,
        ReactiveFormsModule,
        FormsModule,
        ]
})

export class AdminModule { }
