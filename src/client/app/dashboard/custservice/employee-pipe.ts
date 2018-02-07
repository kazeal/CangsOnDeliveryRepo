import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'employeeFilter'})
export class EmployeeFilterPipe implements PipeTransform{

    transform(value :any, filter:string) {
          filter = filter ? filter.toLocaleLowerCase():null;
          return filter ? value.filter((employee:any ) =>
                  employee.empLastName.toLocaleLowerCase().indexOf(filter) !==-1) :value;
    }
}