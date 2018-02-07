import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        ReactiveFormsModule,
        FormsModule,
         ],
    declarations: [ResetComponent],
    exports: [
        ResetComponent,
        ReactiveFormsModule,
        FormsModule,
        ]
})

export class ResetModule { }
