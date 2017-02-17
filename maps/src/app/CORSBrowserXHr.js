"use strict";
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var CORSBrowserXHr = (function (_super) {
    __extends(CORSBrowserXHr, _super);
    function CORSBrowserXHr() {
        _super.apply(this, arguments);
    }
    CORSBrowserXHr.prototype.build = function () {
        var x = _super.prototype.build.call(this);
        x['withCredentials'] = true;
        return x;
    };
    CORSBrowserXHr = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CORSBrowserXHr);
    return CORSBrowserXHr;
}(http_1.BrowserXhr));
exports.CORSBrowserXHr = CORSBrowserXHr;
//# sourceMappingURL=CORSBrowserXHr.js.map