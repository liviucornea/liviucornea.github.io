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
var slimLoadingBarService_1 = require("../../../../../ReusableServices/slimLoadingBarService");
var SlimSliderDemo = (function () {
    function SlimSliderDemo(slimLoader) {
        this.slimLoader = slimLoader;
    }
    SlimSliderDemo.prototype.setProgres30 = function () {
        this.slimLoader.progress = 30;
    };
    SlimSliderDemo.prototype.startProgress = function () {
        // We can listen when loading will be completed
        this.slimLoader.start(function () {
            console.log('Loading complete');
        });
    };
    SlimSliderDemo.prototype.completeProgress = function () {
        this.slimLoader.complete();
    };
    SlimSliderDemo.prototype.stopProgress = function () {
        this.slimLoader.stop();
    };
    SlimSliderDemo.prototype.resetProgress = function () {
        this.slimLoader.reset();
    };
    SlimSliderDemo.prototype.incrementProgress = function () {
        this.slimLoader.progress++;
    };
    SlimSliderDemo.prototype.changeProgressTo4px = function () {
        this.slimLoader.height = '4px';
    };
    SlimSliderDemo.prototype.changeProgressTo2px = function () {
        this.slimLoader.height = '2px';
    };
    SlimSliderDemo.prototype.changeProgressToBlue = function () {
        this.slimLoader.color = 'blue';
    };
    SlimSliderDemo.prototype.changeProgressToFirebrick = function () {
        this.slimLoader.color = 'firebrick';
    };
    SlimSliderDemo = __decorate([
        core_1.Component({
            selector: 'demo-slim',
            template: require('./slimSliderDemo.html')
        }), 
        __metadata('design:paramtypes', [slimLoadingBarService_1.SlimLoadingBarService])
    ], SlimSliderDemo);
    return SlimSliderDemo;
}());
exports.SlimSliderDemo = SlimSliderDemo;
//# sourceMappingURL=SlimSliderDemo.js.map