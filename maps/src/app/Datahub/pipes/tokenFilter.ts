import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'tokenFilter' })
export class TokenFilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: any): any {
        // null check
        if (items == null || filter[0] == null || filter[0].trim() == '') return items;

        // Tokenized search
        var tokens = filter[0].trim().toLowerCase().split(' ');

        // The filter
        return items.filter(item => {
            // Convert items to text for easy searching
            var text: string = "";

            for (var prop in item) {
                text += item[prop] + " ";
            }

            text = text.toLowerCase();

            var match: boolean = true;
            for (var token of tokens) {
                match = match && text.indexOf(token) >= 0;
            }

            return match;
        });
    }
}