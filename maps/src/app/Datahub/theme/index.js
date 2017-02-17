System.register(['./theme.constants', './theme.configProvider', './theme.config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (theme_constants_1_1) {
                exportStar_1(theme_constants_1_1);
            },
            function (theme_configProvider_1_1) {
                exportStar_1(theme_configProvider_1_1);
            },
            function (theme_config_1_1) {
                exportStar_1(theme_config_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=index.js.map