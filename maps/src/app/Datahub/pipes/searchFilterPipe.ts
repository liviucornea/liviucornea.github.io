import {Pipe} from "@angular/core";

@Pipe({
 name: 'searchFilter'
})
export class MultiSelectSearchFilter {
 transform(options: Array<any>, args: string): Array<any> {
  return options.filter((option: any) =>
  option.Description
      .toLowerCase()
      .indexOf((args || '').toLowerCase()) > -1);
 }
}
