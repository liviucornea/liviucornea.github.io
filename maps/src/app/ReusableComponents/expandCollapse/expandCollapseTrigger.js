"use strict";
/**
 * Created by vikhnv2 on 5/19/2016.
 */
var core_1 = require('@angular/core');
var ExpandCollapseTrigger = (function () {
    function ExpandCollapseTrigger() {
    }
    ExpandCollapseTrigger.prototype.ngOnChanges = function (changes) {
        if (changes['collapsed']) {
            this.setCss();
        }
    };
    ExpandCollapseTrigger.prototype.toggle = function () {
        this.owner.collapsed = this.collapsed = !this.collapsed;
        this.owner['selectedColumnName'] = this.columnName;
        this.setCss();
    };
    ExpandCollapseTrigger.prototype.setCss = function () {
        this.triggerCss = "fa " + (this.collapsed ? "fa-plus-circle" : "fa-minus-circle");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ExpandCollapseTrigger.prototype, "collapsed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ExpandCollapseTrigger.prototype, "owner", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ExpandCollapseTrigger.prototype, "columnName", void 0);
    ExpandCollapseTrigger = __decorate([
        core_1.Component({
            selector: 'ec-trigger',
            template: require('./expandCollapseTrigger.html')
        }), 
        __metadata('design:paramtypes', [])
    ], ExpandCollapseTrigger);
    return ExpandCollapseTrigger;
}());
exports.ExpandCollapseTrigger = ExpandCollapseTrigger;
//# sourceMappingURL=expandCollapseTrigger.js.map