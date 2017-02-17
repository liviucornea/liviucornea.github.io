"use strict";
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var SharedModule_1 = require("../../../../../../ReusableComponents/SharedModule");
var postingsByDate_routes_1 = require("./postingsByDate.routes");
var postingsByDate_1 = require("./postingsByDate");
var PostingsByDateModule = (function () {
    function PostingsByDateModule() {
    }
    PostingsByDateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, router_1.RouterModule, SharedModule_1.SharedModule, forms_1.FormsModule, postingsByDate_routes_1.PostingsByDateRouting
            ],
            declarations: [postingsByDate_1.PostingsByDate],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], PostingsByDateModule);
    return PostingsByDateModule;
}());
exports.PostingsByDateModule = PostingsByDateModule;
//# sourceMappingURL=postingsByDate.module.js.map