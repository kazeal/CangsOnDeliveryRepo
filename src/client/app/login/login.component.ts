import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { AppService } from '../app.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from './login.service';
import { UUID } from 'angular2-uuid';
/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	styleUrls: ['login.css']
})

export class LoginComponent {
	 user: string = ''; 
	 pass: string = '';
	 hash:string = '';
	 public emp: any=[];
	 public error: string ="";
	 counter: number=0;
	 logindetails: boolean=false;
	 public inputuser: string = '';
	 public inputpass: string ='';
	 public inputusername: string ='';
	 public rights:any =[];
	 public admin:boolean=false;
	constructor(private router: Router, 
	            private appService: AppService,
				private _cookieService:CookieService,
				private _md5: Md5, private log: LoginService
	 			){
				
				//this._cookieService.put("testkey","testvalue");
				//console.log(Md5.hashStr("test"));
				//console.log(this.user);
			    //console.log(this.pass);
				
				  this._cookieService.remove('1');
				  this._cookieService.remove('2');
				  this._cookieService.remove('3');
				  this._cookieService.remove('4');
				  this._cookieService.remove('5');
				  this._cookieService.remove('6');
				  this._cookieService.remove('7');
				  this._cookieService.remove('8');
				  this._cookieService.remove('9');
				  this._cookieService.remove('10');
				  this._cookieService.remove('11');	
				  this._cookieService.remove('13');			 
				  this._cookieService.remove('employeeID');
				  this._cookieService.remove('employeeName');
				   this._cookieService.remove('employeePass');
				  this._cookieService.remove('employeePassword');
				  this._cookieService.remove('admin');
				 console.log(this._cookieService.getAll());
				 this.log.getEmployees().then(result => {
					this.emp=result;
				    //console.log("INSIDE");
				 });
				
    }

	login(event : any, value: any){
		console.log(this.user);
		console.log(Md5.hashStr(this.pass));
		 for(let data of this.emp)
		 {
			  if(this.user == data.employeeID)
			  {
				  this.counter++;
				  this.error="Incorrect Password";
				  console.log("matchuser");
				  if(Md5.hashStr(this.pass) == data.empPassword)
				  {
					   if(data.empType == "admin")
					   this.admin=true;

					   console.log(data);
					   this.inputuser=data.employeeID;
					   this.inputpass=data.empPassword;
					   
					   this.inputusername= data.empFirstName + " " + data.empMiddleName + ". " + data.empLastName;
					   this.logindetails=true;
					   this.error=""
					   console.log("matchpass");
				  }
				  
			  }
			  console.log(data.empPassword);
		 }
		 if(this.counter > 0)
		 {
			 if(this.logindetails==true)
			 { 
				     this.log.getRights(this.inputuser).then(result => {
							this.rights=result;
							console.log(this.rights);							
				 	});
					setTimeout (() => {
						for (let right of this.rights) {
							for(var i=0; i<15;i++)
							{
								if(right.levelNum == i )
								this._cookieService.put(""+right.levelNum , "true");							
							}
							
							
							console.log(right); // 1, "string", false
						}
						if(this.admin)
						{
							this._cookieService.put("admin", "true");
						}
						this._cookieService.put("employeeID", this.inputuser);
						this._cookieService.put("employeePassword", this.inputpass);
						this._cookieService.put("employeeName", this.inputusername);
						
						this.router.navigateByUrl("/dashboard/home");			
						this.error="";
					}, 2000)
			 }
		 }
		 else
		 {
			this.error="Account does not exist";
			this.router.navigateByUrl("");
		 }
		 
		 //
	} 

	changeGV(val:boolean){
      this.appService.setMyGV(true);
    }

    showGV(){
      alert("GV: " + this.appService.getMyGV());
    }

}
