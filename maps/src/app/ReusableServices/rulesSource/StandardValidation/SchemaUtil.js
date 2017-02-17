"use strict";
var _Score_1 = require('../_Score');
exports.TYPE_KEY = 'type';
exports.PROPERTIES_KEY = 'properties';
exports.DEFAULT_KEY = 'default';
exports.ARRAY_KEY = 'items';
var SchemaUtil = (function () {
    function SchemaUtil() {
    }
    /**
     * Returns the initial JSON data structured according to JSON schema.
     * The data are initilizied with default values.
     */
    SchemaUtil.InitValues = function (formSchema, data) {
        var localData = data || {};
        for (var key in formSchema) {
            var item = formSchema[key];
            var type = item[exports.TYPE_KEY];
            if (type === 'object') {
                localData[key] = {};
                SchemaUtil.InitValues(item[exports.PROPERTIES_KEY], localData[key]);
            }
            else if (type === 'array') {
                localData[key] = [];
            }
            else {
                var defaultValue = item[exports.DEFAULT_KEY];
                if (defaultValue === undefined)
                    continue;
                // Type casting
                if (type === 'boolean') {
                    if (defaultValue === '0') {
                        defaultValue = false;
                    }
                    else {
                        defaultValue = !!defaultValue;
                    }
                }
                if ((type === 'number') ||
                    (type === 'integer')) {
                    if (_Score_1._Score.isString(defaultValue)) {
                        if (!defaultValue.length) {
                            defaultValue = null;
                        }
                        else if (!isNaN(Number(defaultValue))) {
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
    };
    return SchemaUtil;
}());
exports.SchemaUtil = SchemaUtil;
//# sourceMappingURL=SchemaUtil.js.map