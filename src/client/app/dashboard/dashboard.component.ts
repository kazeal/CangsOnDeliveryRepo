import { Component } from '@angular/core';
import { ProductService } from './item/product.service';
import { HttpModule } from '@angular/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
/**
*	This class represents the lazy loaded DashboardComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'dashboard-cmp',
	templateUrl: 'dashboard.component.html'
})

export class DashboardComponent { 
	constructor(private router: Router, private appService: AppService,private _cookieService:CookieService){		
			 //console.log("My cookie variable value: " + this._cookieService.get("testkey"));
			 console.log(this._cookieService.getAll());
        }

}
