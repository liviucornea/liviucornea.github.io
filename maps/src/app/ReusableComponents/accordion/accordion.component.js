"use strict";
var core_1 = require('@angular/core');
var Accordion = (function () {
    function Accordion() {
        this.collapsed = false;
        this.collapsedChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Accordion.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Accordion.prototype, "collapsed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Accordion.prototype, "collapsedChange", void 0);
    Accordion = __decorate([
        core_1.Component({
            selector: 'accordion',
            template: require('./accordion.html'),
        }), 
        __metadata('design:paramtypes', [])
    ], Accordion);
    return Accordion;
}());
exports.Accordion = Accordion;
//# sourceMappingURL=accordion.component.js.map