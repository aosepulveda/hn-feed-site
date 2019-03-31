import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const now: Date = new Date();
    const date: Date = new Date(value);
    var timeDiff = date.getTime() - now.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (date.getDate() === now.getDate() - 1) {
      return "Yesterday";
    }
    switch (diffDays) {
      case 0:
        const formattedMinutes = (date.getUTCMinutes().toString().length === 1)? "0"+date.getUTCMinutes().toString() : date.getUTCMinutes().toString();
        const momentOfDay = (date.getUTCHours() < 12)? "am" : "pm";
        return date.getUTCHours().toString() + ":" + formattedMinutes + " " + momentOfDay;
      default:
        return moment(value).format('MMM D');
    }
  }
}
