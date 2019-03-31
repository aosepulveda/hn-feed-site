import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const now: Date = new Date();
    const date: Date = new Date(value);
    var timeDiff = date.getTime() - now.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    switch (diffDays) {
      case -1:
        return "Yesterday";
      case 0:
        const formattedMinutes = (date.getUTCMinutes().toString().length === 1)? "0"+date.getUTCMinutes().toString() : date.getUTCMinutes().toString();
        const momentOfDay = (date.getUTCHours() < 12)? "am" : "pm";
        return date.getUTCHours().toString() + ":" + formattedMinutes + " " + momentOfDay;
      default:
        return date.getMonth() + " " + date.getDay();
    }
  }
}
