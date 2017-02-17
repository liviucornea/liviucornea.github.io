import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'objectNotFilter' })
export class ObjectNotFilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: any): any {
        // null check
        if (items == null || filter[0] == null) return items;

        var filterObj = filter[0];

        // perform the filter
        return items.filter(item => {
            var match: boolean = true;

            for (var prop in filterObj) {
                match = match &&
                    item.hasOwnProperty(prop) &&
                    item[prop] == filterObj[prop];
            }

            return !match;
        });
    }
}
