import { Pipe, PipeTransform } from '@angular/core';
import  moment from 'moment';

@Pipe({
  name: 'elapsedTime',
  standalone: true
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    const momentValue = moment(value);
    return momentValue.format('YYYY-MM-DD');
  }
  
}
