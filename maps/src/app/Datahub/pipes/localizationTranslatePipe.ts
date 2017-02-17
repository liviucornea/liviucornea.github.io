import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from "../../ReusableServices/localizationService";

@Pipe({ name: 'LocalizationTranslate' })
export class LocalizationTranslatePipe implements PipeTransform {
    constructor(private localizationService: LocalizationService)
    {
        
    }
    transform(data:any, args: any): any {

        if(!data){return;}

        var returnValue;

        if(args && args[0].name) {
            returnValue = this.localizationService.getLocalizedValueDescription(args[0].name);
        }
        else {
            returnValue = this.localizationService.getLocalizedValueDescription(data);
        }

        if(returnValue === data && data.indexOf("_") > 0) {
            returnValue = this.localizationService.getLocalizedValueDescription(data.substring(data.indexOf("_") + 1));
            if(returnValue === data.substring(data.indexOf("_") + 1)) {
                return this.localizationService.getLocalizedValueDescription("defaultValidationMessage");
            }
            else {
                return returnValue;
            }
        }
        else {
            return returnValue;
        }
    }
}

