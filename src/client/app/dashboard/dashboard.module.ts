import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { HomeModule } from './home/home.module';
import { ResetModule } from './reset/reset.module';
import { ItemRestoreModule } from './itemrestore/itemrestore.module';
import { ItemStatisticsYearModule } from './itemstatisticsyear/itemstatisticsyear.module';
import { ItemStatisticsQuarterModule } from './itemstatisticsquarter/itemstatisticsquarter.module';
import { ItemStatisticsMonthModule } from './itemstatisticsmonth/itemstatisticsmonth.module';
import { ItemModule } from './item/item.module';
import { CustomerModule } from './customer/customer.module';
import { CustServiceModule } from './custservice/custservice.module';
import { BSComponentModule } from './bs-component/bsComponent.module';

import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { CustServiceComponent } from './custservice/custservice.component';
import { OrderComponent } from './order/order.component';
import { ItemStatisticsComponent } from './itemstatistics/itemstatistics.component';
import { SidebarComponent } from '../shared/index';

@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule,
        ItemStatisticsYearModule,
    	BSComponentModule,
        ItemStatisticsQuarterModule,
        ItemStatisticsMonthModule,
        ItemModule,
        ItemRestoreModule,
        FormsModule,
        ResetModule,
        CustomerModule,
        CustServiceModule,
        ReactiveFormsModule
    ],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        AdminComponent,        
        OrderComponent,
        ItemStatisticsComponent
        ],
    exports: [
        DashboardComponent,
        SidebarComponent,
        AdminComponent,
        CustomerComponent,
        CustServiceComponent,
        ItemStatisticsComponent,
        OrderComponent
             ]
})

export class DashboardModule { }
