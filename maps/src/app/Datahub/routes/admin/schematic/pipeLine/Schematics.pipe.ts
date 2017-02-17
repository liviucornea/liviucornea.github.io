import {Pipe, PipeTransform} from '@angular/core';

import {Schematic} from './pipeLineUtils'

@Pipe({name: 'schematicsByIdOrDesc'})
export class SchematicFilter implements PipeTransform {
    transform(schematics:Schematic[], filterValue:string) {
        if (filterValue) {
            return schematics.filter((x) => {
                return x.id == filterValue || x.description.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
            });
        } else {
            return schematics;
        }

    }
}