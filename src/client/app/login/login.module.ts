import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';


@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [LoginComponent],
    providers: [
		LoginService,
	],
    exports: [LoginComponent]
})

export class LoginModule { }
