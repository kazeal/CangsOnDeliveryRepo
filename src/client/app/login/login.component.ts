import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { AppService } from '../app.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from './login.service';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
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
	 inputtype:string = '';
	 public emp: any=[];
	 public error: string ="";
	 counter: number=0;
	 logindetails: boolean=false;
	 public inputuser: string = '';
	 public inputpass: string ='';
	 public inputusername: string ='';
	 public inputfirstname: string ='';
	 public rights:any =[];
	 public admin:boolean=false;
	 private timerSubscription: AnonymousSubscription;
     private postsSubscription: AnonymousSubscription;
	constructor(private router: Router, 
	            private appService: AppService,
				private _cookieService:CookieService,
				private chRef: ChangeDetectorRef,
         		private zone: NgZone,
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
				  this._cookieService.remove('employeeFirstName');
				  this._cookieService.remove('employeeType');
				 console.log(this._cookieService.getAll());
				 this.log.getEmployees().subscribe(result => {
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
					   this.inputfirstname=data.empFirstName;
					   this.inputtype=data.empType;
					   this.inputusername= data.empFirstName + " " + data.empMiddleName + " " + data.empLastName;
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
				  this.error="Logging in...";
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
						this._cookieService.put("employeeFirstName", this.inputfirstname);
						this._cookieService.put("employeeType", this.inputtype);
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

	 ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.log.getEmployees().subscribe(

        data  => {
                    console.log(this.emp.length);
                    var i =0;
                    for (let emps of data)
                    {          
                          //  console.log(emps);               
                            this.emp[i]=({
                                'employeeID': emps.employeeID,
								'empPassword': emps.empPassword, 
								'empType': emps.empType, 
								'empLastName': emps.empLastName, 
								'empMiddleName': emps.empMiddleName,
								'empFirstName': emps.empFirstName,  				
                            });
                            i=i+1;
                            
                    
                    }
                    if(i < this.emp.length)
                    {
                        let dif = this.emp.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.emp.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
            this.subscribeToData();
            console.log(this.emp);
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log("complete");
        }
        );
        });
    }
    private subscribeToData(): void {

        this.timerSubscription = Observable.timer(5000)
            .subscribe(() => this.refreshData());
    }
     public ngOnDestroy(): void {

            if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
            }
            if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            }
    }
}
