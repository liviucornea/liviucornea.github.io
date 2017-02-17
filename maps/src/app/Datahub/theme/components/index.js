System.register(['./baMsgCenter', './baCard', './baAmChart', './baChartistChart', './baCheckbox', './baMultiCheckbox'], function(exports_1, context_1) {
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
            function (baMsgCenter_1_1) {
                exportStar_1(baMsgCenter_1_1);
            },
            function (baCard_1_1) {
                exportStar_1(baCard_1_1);
            },
            function (baAmChart_1_1) {
                exportStar_1(baAmChart_1_1);
            },
            function (baChartistChart_1_1) {
                exportStar_1(baChartistChart_1_1);
            },
            function (baCheckbox_1_1) {
                exportStar_1(baCheckbox_1_1);
            },
            function (baMultiCheckbox_1_1) {
                exportStar_1(baMultiCheckbox_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=index.js.map