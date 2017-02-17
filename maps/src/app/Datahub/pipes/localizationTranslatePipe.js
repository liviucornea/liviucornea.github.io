"use strict";
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