import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
@Component({
	moduleId: module.id,
	selector: 'custservice-cmp',
	templateUrl: 'custservice.component.html'
})

export class CustServiceComponent implements OnInit {
	
		empFirstName:string;
		empMiddleName:string;
		empLastName:string;
		empPassword:string;
		empType:string;
		addEmployee:boolean=false; 
		editEmployee:boolean=false;
		delEmployee:boolean=false;
		public employeeID:number;
		i:number=0;
		edAddCustomer:boolean=false;
		edEditCustomer:boolean=false;
		edDelCustomer:boolean=false;
		edAddEmployee:boolean=false; 
		edEditEmployee:boolean=false;
		edDelEmployee:boolean=false;
		edAddItem:boolean=false;
		edEditItem:boolean=false;
		edDelItem:boolean=false;
		edViewItem:boolean=false;
		edViewTransactionHistory:boolean=false;
		edViewItemStatistics:boolean=false;
		rights:any = [{
			0:false,
			1:false,
			2:false,
			3:false,
			4:false,
			5:false,
			6:false,
			7:false,
			8:false,
			9:false,
			10:false,
			11:false,
		}
		];
		public data: any= [];
		public employees: any= [];
		public editRights: any= [];
		public oldRights:any = [{
			0:false,
			1:false,
			2:false,
			3:false,
			4:false,
			5:false,
			6:false,
			7:false,
			8:false,
			9:false,
			10:false,
			11:false,
				
		}
		];
		complexForm : FormGroup;
		complexeditForm : FormGroup;
		private timerSubscription: AnonymousSubscription;
		private postsSubscription: AnonymousSubscription;
		constructor(
				public fb: FormBuilder,
				public fb2: FormBuilder,
				public emp: EmployeeService,
				private _http: HttpModule,
				private chRef: ChangeDetectorRef,
				private zone: NgZone,
				private _cookieService:CookieService){
		
				this.complexForm = fb.group({
			
				'firstName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'middleName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'lastName': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'password' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
				'type' : [null, Validators.required],
				})
				this.complexeditForm = fb2.group({
			
				'firstName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'middleName' : [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'lastName': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")])],
				'type' : [null, Validators.required],
				})
				if(this._cookieService.get('7') == "true")
				this.addEmployee=true;
				if(this._cookieService.get('8') == "true")
				this.editEmployee=true;
				if(this._cookieService.get('9') == "true")
				this.delEmployee=true;

				this.emp.getEmployee().subscribe(result => {
					this.employees=result;
				});
		}
		click(event:any, id:number,pass:string,fname:string,mname:string,lname:string,type:string){
			console.log(id);
			this.editRights =[];
			this.edAddCustomer=false;
			this.edEditCustomer=false;
			this.edDelCustomer=false;
			this.edAddEmployee=false; 
			this.edEditEmployee=false;
			this.edDelEmployee=false;
			this.edAddItem=false;
			this.edEditItem=false;
			this.edDelItem=false;
			this.edViewItem=false;
			this.edViewTransactionHistory=false;
			this.edViewItemStatistics=false;
			this.rights = [{
				0:false,
				1:false,
				2:false,
				3:false,
				4:false,
				5:false,
				6:false,
				7:false,
				8:false,
				9:false,
				10:false,
				11:false,
			}
			];
			this.oldRights = [{
			0:false,
			1:false,
			2:false,
			3:false,
			4:false,
			5:false,
			6:false,
			7:false,
			8:false,
			9:false,
			10:false,
			11:false,
				
			}
			];
			this.emp.getRights(id).then(result => {
			this.editRights=result;
			console.log(this.editRights);
		
			});
			setTimeout (() => {
				this.empFirstName=fname;
				this.empMiddleName=mname;
				this.empLastName=lname;
				this.empPassword=pass;
				this.empType=type;
				this.employeeID=id;
				console.log(this.editRights); 
				console.log(this.oldRights[0]);
				
				for (let editRight of this.editRights) {
					for(var i=0; i<13;i++)
					{
						if(editRight.levelNum == 1 )
						{
							this.edAddCustomer=true;
							this.oldRights[0][0]=true;
							this.rights[0][0]=true;
						}
						if(editRight.levelNum == 2 )
						{
							this.edEditCustomer=true;
							this.oldRights[0][1]=true;
							this.rights[0][1]=true;
						}
						if(editRight.levelNum == 3 )
						{
							this.edDelCustomer=true;
							this.oldRights[0][2]=true;
							this.rights[0][2]=true;
						}

						if(editRight.levelNum == 4 )
						{
							this.edAddItem=true;
							this.oldRights[0][3]=true;
							this.rights[0][3]=true;
						}
						if(editRight.levelNum == 5 )
						{
							this.edEditItem=true;
							this.oldRights[0][4]=true;
							this.rights[0][4]=true;
						}
						if(editRight.levelNum == 6 )
						{
							this.edDelItem=true;
							this.oldRights[0][5]=true;
							this.rights[0][5]=true;
						}

						if(editRight.levelNum == 7 )
						{
							this.edAddEmployee=true;
							this.oldRights[0][6]=true;
							this.rights[0][6]=true;
						}
						if(editRight.levelNum == 8 )
						{
							this.edEditEmployee=true;
							this.oldRights[0][7]=true;
							this.rights[0][7]=true;
						}
						if(editRight.levelNum == 9 )
						{
							this.edDelEmployee=true;
							this.oldRights[0][8]=true;
							this.rights[0][8]=true;
						}	
						if(editRight.levelNum == 10 )
						{
							this.edViewTransactionHistory=true;
							this.oldRights[0][9]=true;
							this.rights[0][9]=true;
						}
						if(editRight.levelNum == 11 )
						{
							this.edViewItemStatistics=true;
							this.oldRights[0][10]=true;
							this.rights[0][10]=true;
						}
						
					}					
					console.log(editRight); 
					
				}
				console.log(this.oldRights);
				
			}, 2000)	
		} 
		clear(){
				this.editRights =[];
				this.edAddCustomer=false;
				this.edEditCustomer=false;
				this.edDelCustomer=false;
				this.edAddEmployee=false; 
				this.edEditEmployee=false;
				this.edDelEmployee=false;
				this.edAddItem=false;
				this.edEditItem=false;
				this.edDelItem=false;
				this.edViewItem=false;
				this.edViewTransactionHistory=false;
				this.edViewItemStatistics=false;
				this.empFirstName="";
				this.empMiddleName="";
				this.empLastName="";
				this.empPassword="";
				this.empType="";
				this.rights = [{
					0:false,
					1:false,
					2:false,
					3:false,
					4:false,
					5:false,
					6:false,
					7:false,
					8:false,
					9:false,
					10:false,
					11:false,
				}
				];
				this.oldRights = [{
				0:false,
				1:false,
				2:false,
				3:false,
				4:false,
				5:false,
				6:false,
				7:false,
				8:false,
				9:false,
				10:false,
				11:false,
					
				}
				];	
		}
		onSubmitEdit() {	
				this.data.push({
					'employeeID': this.employeeID,
					'empPassword': this.empPassword, 
					'empType': this.empType, 
					'empLastName': this.empLastName, 
					'empMiddleName': this.empMiddleName,
					'empFirstName': this.empFirstName, 			
				});
				console.log(this.data[0]);
				this.emp.editEmployee(this.data[0]);
				this.data.pop();
				this.emp.editRight(this.employeeID,this.rights[0],this.oldRights[0]);
				this.editRights =[];
				this.edAddCustomer=false;
				this.edEditCustomer=false;
				this.edDelCustomer=false;
				this.edAddEmployee=false; 
				this.edEditEmployee=false;
				this.edDelEmployee=false;
				this.edAddItem=false;
				this.edEditItem=false;
				this.edDelItem=false;
				this.edViewItem=false;
				this.edViewTransactionHistory=false;
				this.edViewItemStatistics=false;
				this.empFirstName="";
				this.empMiddleName="";
				this.empLastName="";
				this.empPassword="";
				this.empType="";
				this.rights = [{
					0:false,
					1:false,
					2:false,
					3:false,
					4:false,
					5:false,
					6:false,
					7:false,
					8:false,
					9:false,
					10:false,
					11:false,
				}
				];
				this.oldRights = [{
				0:false,
				1:false,
				2:false,
				3:false,
				4:false,
				5:false,
				6:false,
				7:false,
				8:false,
				9:false,
				10:false,
				11:false,
					
				}
				];	
	}
	onChange(element: HTMLInputElement)
	{
		switch(element.value)
		{
			case "Add Customer":this.rights[0][0]=element.checked; break;
			case "Edit Customer":this.rights[0][1]=element.checked; break;
			case "Delete Customer":this.rights[0][2]=element.checked; break;
			case "Add Employee":this.rights[0][6]=element.checked; break;
			case "Edit Employee":this.rights[0][7]=element.checked;; break;
			case "Delete Employee":this.rights[0][8]=element.checked; break;
			case "Add Item":this.rights[0][3]=element.checked; break;
			case "Edit Item":this.rights[0][4]=element.checked; break;
			case "Delete Item":this.rights[0][5]=element.checked; break;
			case "View Transaction History":this.rights[0][9]=element.checked; break;
			case "View Item Statistics":this.rights[0][10]=element.checked; break;
			
				
		}
		
			//console.log(this.rights[0]);
	}
	onChangeEdit(element: HTMLInputElement)
	{
		switch(element.value)
		{
			case "Add Customer":this.rights[0][0]=element.checked; break;
			case "Edit Customer":this.rights[0][1]=element.checked; break;
			case "Delete Customer":this.rights[0][2]=element.checked; break;
			case "Add Employee":this.rights[0][6]=element.checked; break;
			case "Edit Employee":this.rights[0][7]=element.checked;; break;
			case "Delete Employee":this.rights[0][8]=element.checked; break;
			case "Add Item":this.rights[0][3]=element.checked; break;
			case "Edit Item":this.rights[0][4]=element.checked; break;
			case "Delete Item":this.rights[0][5]=element.checked; break;
			case "View Transaction History":this.rights[0][9]=element.checked; break;
			case "View Item Statistics":this.rights[0][10]=element.checked; break;
				
		}
		// console.log(this.rights[0]["addCustomer"]);
			//console.log(this.rights[0]);
	}
	onSubmitAdd() {
		// console.log(this.rights[0]);
			this.data.push({
					'empPassword': Md5.hashStr(this.empPassword), 
					'empType': this.empType, 
					'empLastName': this.empLastName, 
					'empMiddleName': this.empMiddleName,
					'empFirstName': this.empFirstName, 			
				});
				//console.log(this.data[0]);
				this.emp.addEmployee(this.data[0],this.rights[0]);
				this.data.pop();
				this.rights = [{
					0:false,
					1:false,
					2:false,
					3:false,
					4:false,
					5:false,
					6:false,
					7:false,
					8:false,
					9:false,
					10:false,	
				}
				];
				this.editRights =[];
				this.edAddCustomer=false;
				this.edEditCustomer=false;
				this.edDelCustomer=false;
				this.edAddEmployee=false; 
				this.edEditEmployee=false;
				this.edDelEmployee=false;
				this.edAddItem=false;
				this.edEditItem=false;
				this.edDelItem=false;
				this.edViewItem=false;
				this.edViewTransactionHistory=false;
				this.edViewItemStatistics=false;
				this.empFirstName="";
				this.empMiddleName="";
				this.empLastName="";
				this.empPassword="";
				this.empType="";
				this.rights = [{
					0:false,
					1:false,
					2:false,
					3:false,
					4:false,
					5:false,
					6:false,
					7:false,
					8:false,
					9:false,
					10:false,
					11:false,
				}
				];
				this.oldRights = [{
					0:false,
					1:false,
					2:false,
					3:false,
					4:false,
					5:false,
					6:false,
					7:false,
					8:false,
					9:false,
					10:false,
					11:false,
					
				}
				];
				console.log("working");	
				//this.emp.addEmployeeRights(this.employeeID,this.rights[0]);
				/*	
			*/

		
	}

	onSubmitDel() {
			this.data.push({
					'employeeID': this.employeeID,
					'empPassword': this.empPassword, 
					'empType': this.empType, 
					'empLastName': this.empLastName, 
					'empMiddleName': this.empMiddleName,
					'empFirstName': this.empFirstName, 			
				});
				console.log(this.data[0]);
				this.emp.delEmployee(this.data[0]);
				this.data.pop();
				this.editRights =[];
				this.edAddCustomer=false;
				this.edEditCustomer=false;
				this.edDelCustomer=false;
				this.edAddEmployee=false; 
				this.edEditEmployee=false;
				this.edDelEmployee=false;
				this.edAddItem=false;
				this.edEditItem=false;
				this.edDelItem=false;
				this.edViewItem=false;
				this.edViewTransactionHistory=false;
				this.edViewItemStatistics=false;
				this.empFirstName="";
				this.empMiddleName="";
				this.empLastName="";
				this.empPassword="";
				this.empType="";
				this.employeeID=null;
				this.rights = [{
					0:false,
					1:false,
					2:false,
					3:false,
					4:false,
					5:false,
					6:false,
					7:false,
					8:false,
					9:false,
					10:false,
					11:false,
				}
				];
				this.oldRights = [{
				0:false,
				1:false,
				2:false,
				3:false,
				4:false,
				5:false,
				6:false,
				7:false,
				8:false,
				9:false,
				10:false,
				11:false,
					
				}
				];
		
	}
	 ngOnInit() {
        this.refreshData();
    }
    
     private refreshData(): void {
         this.zone.run(() => {
         this.chRef.detectChanges();
        this.postsSubscription = this.emp.getEmployee().subscribe(

        data  => {
                    console.log(this.employees.length);
                    var i =0;
                    for (let emps of data)
                    {                                                 
                            this.employees[i]=({
                                'employeeID': emps.employeeID,
								'empPassword': emps.empPassword, 
								'empType': emps.empType, 
								'empLastName': emps.empLastName, 
								'empMiddleName': emps.empMiddleName,
								'empFirstName': emps.empFirstName,				
                            });
                            i=i+1;
                                                     
                    }
                    if(i < this.employees.length)
                    {
                        let dif = this.employees.length - i;
                        let test;
                        for(dif;dif>0;dif--)
                        {
                                test=this.employees.pop();
                                console.log(test);
                        }
                    }
                    i=0;   
            this.subscribeToData();
            console.log(this.employees);
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
