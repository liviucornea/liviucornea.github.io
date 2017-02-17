import { IPropertyValidator } from '../StandardValidation/Validation';

export class GenericValidator implements IPropertyValidator {

    public genericFunctionResult: boolean = false;

    tagName = 'genericValidator';

    public isAcceptable(s: any) {
        return this.genericFunctionResult;
    }
}
