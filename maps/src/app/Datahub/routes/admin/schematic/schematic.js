"use strict";
var core_1 = require('@angular/core');
var navigationService_1 = require("../../../../ReusableServices/navigationService");
var Schematic = (function () {
    function Schematic(navService) {
        this.navService = navService;
        /* this.navService.getChildMenu(['Admin','Schematic']);
         this.navService.getLeftMenuRoutes(['Schematic']);*/
    }
    Schematic = __decorate([
        core_1.Component({
            selector: 'schematic',
            template: "",
        }), 
        __metadata('design:paramtypes', [navigationService_1.NavigationService])
    ], Schematic);
    return Schematic;
}());
exports.Schematic = Schematic;
//# sourceMappingURL=schematic.js.map