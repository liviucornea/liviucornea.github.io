import { IAsyncPropertyValidator } from '../StandardValidation/Validation';
import { _Score } from '../_Score';


class ParamValidator implements IAsyncPropertyValidator {

    public ParamId: string;
    public Options: { (string): Promise<Array<any>> };

    isAsync = true;
    tagName = 'param';

    isAcceptable(s: string): Promise<boolean> {
        let result: boolean;
        let deferred = new Promise<boolean>(x => { x(result); });

        this.Options(this.ParamId).then(function (result) {
            let hasSome = _Score.some(result, function (item) {
                return item.text === s;
            });
            if (hasSome) {
                this.result = true;
            }
            else {
                this.result = false;
            }
            Promise.resolve(deferred);
        });

        return deferred;
    }
}
