import {Pipe, PipeTransform} from "@angular/core";
import * as _ from 'lodash';
@Pipe({
    name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform{
    transform(data: any, searchFilters:any) {

        if(data == null || !data.length){return;}
        if(!searchFilters && !searchFilters[0]) { return data;}

        var filterValue = searchFilters[0];
        let finalArray=[];
        if (filterValue) {
            searchFilters[1].forEach(y => {
                let editViewRowDataTable = searchFilters[2].find(x=> x.name == y);
                let tempValue = y;
                if(editViewRowDataTable && !editViewRowDataTable.htmlControlType.startsWith('text'))
                {
                    tempValue = editViewRowDataTable.val;
                }
                let tempResult = data.filter(x => _.toString(x[tempValue]).toLowerCase().includes(filterValue.toLowerCase()));
                finalArray = _.union(finalArray,tempResult);
            });
        }
        return finalArray;
    }
}
