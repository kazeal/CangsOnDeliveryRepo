import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
@Component({
	//moduleId: module.id,
    selector: '[attributes]',
    template: ` <td>{{tests.productID}}</td>
        <td>{{tests.productName}}</td>
         <td>{{tests.productQuantity}}</td>`
}
)

export class BlankPageComponent2 {

}
