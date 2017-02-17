"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var analysisConstructionTool_routes_1 = require("./analysisConstructionTool.routes");
var analysisConstructionTool_1 = require("./analysisConstructionTool");
var MpdbAnalysisConstructionToolModule = (function () {
    function MpdbAnalysisConstructionToolModule() {
    }
    MpdbAnalysisConstructionToolModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, analysisConstructionTool_routes_1.MpdbAnalysisConstructionToolRouting
            ],
            declarations: [analysisConstructionTool_1.MpdbAnalysisConstructionTool],
        }), 
        __metadata('design:paramtypes', [])
    ], MpdbAnalysisConstructionToolModule);
    return MpdbAnalysisConstructionToolModule;
}());
exports.MpdbAnalysisConstructionToolModule = MpdbAnalysisConstructionToolModule;
//# sourceMappingURL=analysisConstructionTool.module.js.map