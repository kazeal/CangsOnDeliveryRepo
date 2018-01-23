import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService{
    authentiated :any ;

    constructor(){
      this.authentiated = false;
      //console.log("My global variable value: " + this.authentiated);
     // alert("My intial global variable value is: " + this.authentiated);
    }

    setMyGV(val: boolean){
      console.log("Setting FV to: " + val);
      //this.authentiated = val;
    }

    getMyGV(){
      //return this.authentiated;
    }
}