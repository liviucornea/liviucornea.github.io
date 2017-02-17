import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import {CalendarDateFormatter} from "../../ReusableComponents/Calendar/CalendarHelpers/calendarDateFormatter.provider";
import {fns} from "../routes/home/fns";

@Pipe({
  name: 'calendarDate'
})
export class CalendarDate implements PipeTransform {

  constructor(private dateFormatter: CalendarDateFormatter, @Inject(LOCALE_ID) private locale: string) {
  }

  transform(date: Date, method: string, locale: string = this.locale): string {
    var fnc = this.dateFormatter[method];
    var result =  fnc({date, locale});
    if ((method!=="monthViewDayNumber") && (method!=="monthViewColumnHeader")) {

      let tmp = result;
      var pastDate:Date=fns.removeWeeks(fns.parse(date),2);
      var postDate:Date= fns.addWeeks(fns.parse(date),2);
        fns.setCurrentDate(pastDate);
      var result1 =  fnc(pastDate, locale);
        fns.setCurrentDate(postDate);
      var result2 =  fnc(postDate, locale);
      if (result1!==tmp){
        result = result1+"---"+ tmp;
      }
      if (result2!==tmp){
        result = result+"---"+ result2;
      }
    }
    return result;
  }
}