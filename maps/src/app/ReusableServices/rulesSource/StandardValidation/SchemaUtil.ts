import { _Score } from '../_Score';

export let TYPE_KEY = 'type';
export let PROPERTIES_KEY = 'properties';
export let DEFAULT_KEY = 'default';
export let ARRAY_KEY = 'items';

export class SchemaUtil {

    /**
     * Returns the initial JSON data structured according to JSON schema.
     * The data are initilizied with default values.
     */
    static InitValues(formSchema: any, data?: any) {
        let localData = data || {};

        for (let key in formSchema) {
            let item = formSchema[key];
            let type = item[TYPE_KEY];
            if (type === 'object') {
                localData[key] = {};
                SchemaUtil.InitValues(item[PROPERTIES_KEY], localData[key]);
            }
            else if (type === 'array') {
                localData[key] = [];
            }
            else {
                let defaultValue = item[DEFAULT_KEY];
                if (defaultValue === undefined) continue;

                // Type casting
                if (type === 'boolean') {
                    if (defaultValue === '0') {
                        defaultValue = false;
                    } else {
                        defaultValue = !!defaultValue;
                    }
                }
                if ((type === 'number') ||
                    (type === 'integer')) {
                    if (_Score.isString(defaultValue)) {
                        if (!defaultValue.length) {
                            defaultValue = null;
                        } else if (!isNaN(Number(defaultValue))) {
                            defaultValue = Number(defaultValue);
                        }
                    }
                }
                if ((type === 'string') &&
                    (defaultValue === '')) {
                    defaultValue = null;
                }

                // TODO: default value
                localData[key] = defaultValue;

            }
        }
        return localData;
    }
}
