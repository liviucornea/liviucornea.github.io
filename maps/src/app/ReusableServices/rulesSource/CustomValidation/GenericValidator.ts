import {IPropertyValidator} from "../StandardValidation/Validation";

export class GenericValidator implements IPropertyValidator {

    public isAcceptable(s: any) {
        return this.genericFunctionResult;
    }

    public genericFunctionResult: boolean = false;

    tagName = 'genericValidator';

}


