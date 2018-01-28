import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
//https://cangsapi.000webhostapp.com/index.php/Products/get_products
         
@Injectable()
export class EmployeeService{
    post: any;
    head = new Headers();
    requestOptions = new RequestOptions();
    i:number=0;
    public addRights: any =[];
    public editRights: any =[];
    public static employeeID:any;
    private _apiUrl = 'http://192.168.0.24:1025';//http://192.168.0.24:1025 //http://192.168.1.153:1025
    private _employeeAddUrl ='http://192.168.0.24:1025/employee/addEmployee';
    private _employeeEditUrl ='http://192.168.0.24:1025/employee/editEmployee';
     private _employeeEditRightsUrl ='http://192.168.0.24:1025/accessRights/editRights';
    private _employeeDelUrl ='http://192.168.0.24:1025/employee/deleteEmployee';
    private _employeeAddRightsUrl ='http://192.168.0.24:1025/accessRights/addAccessRights';
    constructor(private _http: Http){}
     
    getEmployee(){
        return this._http.get(this._apiUrl + "/employee/all").map((res:Response) => res.json());
    }
     getOneEmployee(employeeID: any): any{

            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })
            
            var url = this._apiUrl + "/employee/getOneEmployee/"+ employeeID;

            return new Promise(resolve => {
                this._http.get(url).map(res => res.json()).subscribe(data => {
                    this.post = data;
                    resolve(this.post);
                    console.log(this.post);
                });
            }  
     )};
     getRights(employeeID: any): any{

            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })
            
            var url = this._apiUrl + "/accessRights/getRights/"+ employeeID;
           
            return new Promise(resolve => {
                this._http.get(url).map(res => res.json()).subscribe(data => {
                    this.post = data;
                    resolve(this.post);
                    console.log(this.post);
                });
            }  
     )};
     editRight(empID:any,newRights:any, oldRights:any){
         
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })      
            for(var i=0;i<11;i++)
            {
                //console.log("New Rights" + i+1 + " :" + newRights[i]);
                //console.log("Old Rights" + i+1 + " :" + oldRights[i])
                if(newRights[i] == oldRights[i])
                {
                    console.log("inside true");
                }
                else
                {
                    console.log("inside false");
                    this.editRights=({
                        'employeeID': empID, 
                        'levelNum': i+1, 		
                    });
                    console.log(this.editRights);
                    
                    this._http.post(this._employeeEditRightsUrl,JSON.stringify(this.editRights), reqopt).subscribe(function(res){
                        this.response=res;
                        //alert(this.response);
                    });   
                    this.editRights =[];           
                }
            }     
     }
     
     addEmployee(data:any,rights:any){

            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })     
                this._http.post(this._employeeAddUrl,JSON.stringify(data), reqopt).subscribe(function(res){
                    this.response=res;
                      alert("Employee Successfully Added!");
                    console.log(this.response._body);
                    EmployeeService.employeeID=this.response._body;  
                  //  console.log(this.employeeID);                  
                this.addRights.length=0;
                });
                setTimeout (() => {
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    let reqopt = new RequestOptions({
                        headers: headers
                    })     
                    for(this.i=0;this.i<11;this.i++)
                        {
                            
                            if(rights[this.i]==true && this.i==0)
                            {
                                    //console.log(EmployeeService.employeeID);
                                    //this.addRights =[];
                                    this.addRights=({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 1, 		
                                });
                                console.log(this.addRights);
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights), reqopt).subscribe(function(res:any){
                                        this.response=res;      
                                       
                                });
                                this.addRights =[];
                                
                            
                            }
                            else if(rights[this.i]==true && this.i==1)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 2, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                        
                                    });
                                        console.log(this.addRights);
                                this.addRights =[];

                            }
                            else if(rights[this.i]==true && this.i==2)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 3, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                                this.addRights =[];
                                
                            }
                            else if(rights[this.i]==true && this.i==3)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 4, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                            this.addRights =[];
                                
                            }
                            else if(rights[this.i]==true && this.i==4)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 5, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                                this.addRights =[];
                                
                            }
                            else if(rights[this.i]==true && this.i==5)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 6, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                                this.addRights =[];
                                
                            }
                            else if(rights[this.i]==true && this.i==6)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 7, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                });
                                    console.log(this.addRights);
                                this.addRights =[];
                                
                            }
                            else if(rights[this.i]==true && this.i==7)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 8, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                            this.addRights =[];
                                
                                
                            }
                            else if(rights[this.i]==true && this.i==8)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 9, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                });
                                    console.log(this.addRights);
                                this.addRights =[];
                                            
                                
                            }
                            else if(rights[this.i]==true && this.i==9)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 10, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                                this.addRights =[];
                                
                            }
                            else if(rights[this.i]==true && this.i==10)
                            {
                                this.addRights.push({
                                    'employeeID': EmployeeService.employeeID, 
                                    'levelNum': 11, 		
                                });
                                this._http.post(this._employeeAddRightsUrl,JSON.stringify(this.addRights[0]), reqopt).subscribe(function(res:any){
                                        this.response=res;
                                    });
                                        console.log(this.addRights);
                                this.addRights =[];
                                
                            }     
                        }
            }, 5000)

     }
     editEmployee(data:any){
         
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })
            
            this._http.post(this._employeeEditUrl,JSON.stringify(data), reqopt).subscribe(function(res){
                this.response=res;
                alert("Employee Successfully Updated!");
            });
          
     }
      delEmployee(data:any){
         
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let reqopt = new RequestOptions({
                headers: headers
            })

            var url = this._apiUrl + "/employee/delete/"+ data.employeeID;
            
            this._http.put(url,null, reqopt).subscribe(function(res){
                this.response=res;
                alert("Employee Successfully Deleted!");
            });
            var url2 = this._apiUrl + "/accessRights/deleteAccessRights/"+ data.employeeID;
           
            this._http.put(url2,null, reqopt).subscribe(function(res){
                this.response=res;
               //alert("Employee Successfully Deleted!");
            });
           
      }
  
}