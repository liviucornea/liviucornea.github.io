"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var navigationService_1 = require("./ReusableServices/navigationService");
var AppComponent = (function () {
    function AppComponent(document, navService) {
        this.document = document;
        this.navService = navService;
        this.title = 'Data hub';
        //Added navService object as it is used in app.html to display PageTitle. Please do not remove this
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: require('./app.html')
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, navigationService_1.NavigationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map