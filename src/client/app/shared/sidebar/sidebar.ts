import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent {
	showMenu: string = '';
	view: boolean = true;
    addCustomer:boolean=false;
	editCustomer:boolean=false;
	delCustomer:boolean=false;
	addEmployee:boolean=false; 
	editEmployee:boolean=false;
	delEmployee:boolean=false;
	addItem:boolean=false;
	editItem:boolean=false;
	delItem:boolean=false;
	viewItem:boolean=false;
	viewTransactionHistory:boolean=false;
	viewItemStatistics:boolean=false;
	admin:boolean=false;
	constructor(private _cookieService:CookieService){	              
          if(this._cookieService.get('1') == "true")
		  this.addCustomer=true;
		  if(this._cookieService.get('2') == "true")
		  this.editCustomer=true;
		  if(this._cookieService.get('3') == "true")
		  this.delCustomer=true;
		  if(this._cookieService.get('4') == "true")
		  this.addItem=true;
		  if(this._cookieService.get('5') == "true")
		  this.editItem=true;          
		  if(this._cookieService.get('6') == "true")
		  this.delItem=true;
		  if(this._cookieService.get('7') == "true")
		  this.addEmployee=true;
		  if(this._cookieService.get('8') == "true")
		  this.editEmployee=true;
		  if(this._cookieService.get('9') == "true")
		  this.delEmployee=true;
		  if(this._cookieService.get('10') == "true")
		  this.viewTransactionHistory=true;
		  if(this._cookieService.get('11') == "true")
		  this.viewItemStatistics=true;
		  if(this._cookieService.get('13') == "true")
		  this.viewItem=true;
		  if(this._cookieService.get('admin') == "true")
		  this.admin=true;
    }
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
		
		
	}
	

	
}
