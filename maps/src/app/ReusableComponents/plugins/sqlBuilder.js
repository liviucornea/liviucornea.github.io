"use strict";
var core_1 = require("@angular/core");
/**
 * Created by noutaa2 on 4/7/2016.
 */
var sqlBuilder = (function () {
    function sqlBuilder() {
    }
    sqlBuilder.prototype.activate = function () {
    };
    sqlBuilder.prototype.returnResult = function () {
        return "";
    };
    sqlBuilder.prototype.completedCallBack = function (callBack) {
        this.processEndProcess = callBack;
    };
    sqlBuilder = __decorate([
        core_1.Component({
            selector: 'sqlBuilder',
            template: "",
        }), 
        __metadata('design:paramtypes', [])
    ], sqlBuilder);
    return sqlBuilder;
}());
exports.sqlBuilder = sqlBuilder;
//# sourceMappingURL=sqlBuilder.js.map