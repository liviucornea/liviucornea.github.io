System.register(["@angular/router", "./holidaySetCode"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, holidaySetCode_1;
    var HolidaySetCodeRouting;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (holidaySetCode_1_1) {
                holidaySetCode_1 = holidaySetCode_1_1;
            }],
        execute: function() {
            exports_1("HolidaySetCodeRouting", HolidaySetCodeRouting = router_1.RouterModule.forChild([
                { path: 'holidaySetCode', component: holidaySetCode_1.HolidaySetCode }
            ]));
        }
    }
});
//# sourceMappingURL=holiday.routing.js.map