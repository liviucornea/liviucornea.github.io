System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ruleConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("ruleConfig", ruleConfig = [{
                    "ruleType": "OneOf",
                    "applyTo": "AllOf",
                    "ruleAssociates": ["Email", "Telephone"],
                    "apiObject": "Address"
                }]);
        }
    }
});
//# sourceMappingURL=ruleConfiguration.js.map