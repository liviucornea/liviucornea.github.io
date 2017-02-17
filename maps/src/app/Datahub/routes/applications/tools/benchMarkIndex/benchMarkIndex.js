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
var navigationService_1 = require("../../../../../ReusableServices/navigationService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var common_1 = require("@angular/common");
var BenchMarkIndex = (function () {
    function BenchMarkIndex(navigationService, alt, location) {
        this.navigationService = navigationService;
        this.alt = alt;
        this.location = location;
        this.childItems = [];
        this.alert = alt;
    }
    BenchMarkIndex.prototype.ngOnInit = function () {
        this.childItems = this.navigationService.getChildMenusForTileView('BenchMarkIndex');
    };
    BenchMarkIndex = __decorate([
        core_1.Component({
            selector: 'benchMarkIndex',
            template: "\n    <tileView [menuItemsList]=\"childItems\"></tileView>\n"
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService, alertService_1.AlertService, common_1.Location])
    ], BenchMarkIndex);
    return BenchMarkIndex;
}());
exports.BenchMarkIndex = BenchMarkIndex;
//# sourceMappingURL=benchMarkIndex.js.map