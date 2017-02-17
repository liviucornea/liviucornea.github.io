/*
 * This empty directive serves as a workaround for the usage of a custom tag that is not HTML.
 * See: https://github.com/angular/angular/issues/11251
 *
 * Author: Michael Ling
 *
 * */
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
var core_1 = require('@angular/core');
var AccordionBodyContent = (function () {
    function AccordionBodyContent() {
    }
    AccordionBodyContent = __decorate([
        core_1.Directive({ selector: 'accordionBodyContent' }), 
        __metadata('design:paramtypes', [])
    ], AccordionBodyContent);
    return AccordionBodyContent;
}());
exports.AccordionBodyContent = AccordionBodyContent;
//# sourceMappingURL=accordionBodyContent.directive.js.map