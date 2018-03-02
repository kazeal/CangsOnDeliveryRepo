import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { SharedModule } from './shared/shared.module';
import { ProductService } from './dashboard/item/product.service';
import { CustomerService } from './dashboard/customer/customer.service';
import { EmployeeService } from './dashboard/custservice/employee.service';
import { OrderService } from './dashboard/order/order.service';
import { LoginService } from './login/login.service';
import { HomeService } from './dashboard/home/home.service';


import { AppService } from './app.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {Md5} from 'ts-md5/dist/md5';
//import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { NgForm } from '@angular/forms'
//import { Ng2UploaderModule } from 'ng2-uploader';
import { DashboardGuard } from './dashboard/dashboard-guard.service';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RouterModule.forRoot(routes),
		LoginModule,

		DashboardModule,
		SharedModule.forRoot()
	],
	declarations: [AppComponent,
				
				   //Ng2UploaderModule
				   ],
	providers: [
		ProductService,
		AppService,
		CookieService,
		LoginService,
		CustomerService,
		Md5,
		EmployeeService,
		OrderService,
		HomeService,
		DashboardGuard,
		//Angular2Csv,
		{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>',
		
	}],
	bootstrap: [AppComponent]

})

export class AppModule { }
