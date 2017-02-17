import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: 'multiSelectSearchFilter'
})

export class MultiSelectSearchFilterPipe implements PipeTransform{
    transform(data: any, searchFilter:any) {

        if(data == null || !data.length){return;}
        if(!searchFilter) { return data;}

        return data.filter((option: any) =>
        option.Description
            .toLowerCase()
            .indexOf((searchFilter || '').toLowerCase()) > -1);
    }
}
