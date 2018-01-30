import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Injectable()
export class DashboardGuard implements CanActivate{
        constructor(private _router: Router,private _cookieService:CookieService){	              
                    
        }
       canActivate(): boolean{
         /*
         console.log(this._cookieService.getAll());
         console.log(this._cookieService.get('employeeID'));
         if(this._cookieService.get('employeeID') == null)
         {
              console.log("working");
              this._router.navigate(['http://localhost:5555/']);
              return false;
         }
         else
         {
            console.log("working2");
            return true;
         }
          */
        
        return true;
         
           
       }
}