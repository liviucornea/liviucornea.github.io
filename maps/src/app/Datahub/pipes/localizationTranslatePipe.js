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
var localizationService_1 = require("../../ReusableServices/localizationService");
var LocalizationTranslatePipe = (function () {
    function LocalizationTranslatePipe(localizationService) {
        this.localizationService = localizationService;
    }
    LocalizationTranslatePipe.prototype.transform = function (data, args) {
        if (!data) {
            return;
        }
        var returnValue;
        if (args && args[0].name) {
            returnValue = this.localizationService.getLocalizedValueDescription(args[0].name);
        }
        else {
            returnValue = this.localizationService.getLocalizedValueDescription(data);
        }
        if (returnValue === data && data.indexOf("_") > 0) {
            returnValue = this.localizationService.getLocalizedValueDescription(data.substring(data.indexOf("_") + 1));
            if (returnValue === data.substring(data.indexOf("_") + 1)) {
                return this.localizationService.getLocalizedValueDescription("defaultValidationMessage");
            }
            else {
                return returnValue;
            }
        }
        else {
            return returnValue;
        }
    };
    LocalizationTranslatePipe = __decorate([
        core_1.Pipe({ name: 'LocalizationTranslate' }), 
        __metadata('design:paramtypes', [localizationService_1.LocalizationService])
    ], LocalizationTranslatePipe);
    return LocalizationTranslatePipe;
}());
exports.LocalizationTranslatePipe = LocalizationTranslatePipe;
//# sourceMappingURL=localizationTranslatePipe.js.map