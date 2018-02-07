import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'customerFilter'})
export class CustomerFilterPipe implements PipeTransform{

    transform(value :any, filter:string) {
          filter = filter ? filter.toLocaleLowerCase():null;
          return filter ? value.filter((customer:any ) =>
                  customer.cusLastName.toLocaleLowerCase().indexOf(filter) !==-1) :value;
    }
}