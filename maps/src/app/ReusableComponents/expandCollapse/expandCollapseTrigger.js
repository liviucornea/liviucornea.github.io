"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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