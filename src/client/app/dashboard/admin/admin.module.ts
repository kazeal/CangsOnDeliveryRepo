import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';


@NgModule({
    imports: [CommonModule, CarouselModule],
    declarations: [AdminComponent],
    exports: [AdminComponent]
})

export class AdminModule { }
