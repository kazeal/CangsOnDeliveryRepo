import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { HomeModule } from './home/home.module';
import { ItemModule } from './item/item.module';
import { BSComponentModule } from './bs-component/bsComponent.module';

import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { CustServiceComponent } from './custservice/custservice.component';
import { OrderComponent } from './order/order.component'
import { SidebarComponent } from '../shared/index';

@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule,
    	BSComponentModule,
        ItemModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        AdminComponent, 
        CustomerComponent,
        CustServiceComponent,
        OrderComponent
        ],
    exports: [
        DashboardComponent,
        SidebarComponent,
        AdminComponent,
        CustomerComponent,
        CustServiceComponent,
        OrderComponent
             ]
})

export class DashboardModule { }
