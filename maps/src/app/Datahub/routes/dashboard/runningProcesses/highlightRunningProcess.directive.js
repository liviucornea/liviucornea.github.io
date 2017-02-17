"use strict";
var core_1 = require('@angular/core');
var ProcessHighlightDirective = (function () {
    function ProcessHighlightDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this._defaultColor = 'white';
    }
    ProcessHighlightDirective.prototype.ngAfterViewInit = function () {
        if (this.highlightColor)
            this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor || this._defaultColor);
    };
    __decorate([
        core_1.Input('processHighlight'), 
        __metadata('design:type', String)
    ], ProcessHighlightDirective.prototype, "highlightColor", void 0);
    ProcessHighlightDirective = __decorate([
        core_1.Directive({
            selector: '[processHighlight]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], ProcessHighlightDirective);
    return ProcessHighlightDirective;
}());
exports.ProcessHighlightDirective = ProcessHighlightDirective;
//# sourceMappingURL=highlightRunningProcess.directive.js.map