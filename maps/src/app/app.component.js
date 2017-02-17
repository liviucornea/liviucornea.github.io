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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var navigationService_1 = require("./ReusableServices/navigationService");
var interFormsService_1 = require("./ReusableServices/interFormsService");
var AppComponent = (function () {
    function AppComponent(document, navService, intFormSvc) {
        //Added navService object as it is used in app.html to display PageTitle. Please do not remove this
        var _this = this;
        this.document = document;
        this.navService = navService;
        this.intFormSvc = intFormSvc;
        this.title = 'Data hub';
        this.theme = 'standard';
        this.fontSize = 14;
        this.intFormSvc.themeEmitter.subscribe(function (value) {
            _this.toggleTheme();
        });
        this.intFormSvc.fontSizeEmitter.subscribe(function (change) {
            _this.fontSize = _this.fontSize + change;
        });
    }
    AppComponent.prototype.toggleTheme = function () {
        if (this.theme == 'standard') {
            this.theme = 'dark';
        }
        else {
            this.theme = 'standard';
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: require('./app.html')
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, navigationService_1.NavigationService, interFormsService_1.InterFormsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map