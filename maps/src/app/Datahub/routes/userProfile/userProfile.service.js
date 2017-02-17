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
/**
 * Created by vikhnv2 on 12/5/2016.
 */
var core_1 = require('@angular/core');
var httpAbstract_1 = require('../../../ReusableServices/httpAbstract');
var userProfile_config_1 = require('./userProfile.config');
var UserProfileService = (function () {
    function UserProfileService(httpBase) {
        this.httpBase = httpBase;
        this.baseUrl = userProfile_config_1.ComponentSettings.Api.BaseUrl;
        //
    }
    UserProfileService.prototype.getAuthUserProfile = function () {
        this.httpBase.setBaseAddress(this.baseUrl);
        return this.httpBase.fetch('profile');
    };
    UserProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract])
    ], UserProfileService);
    return UserProfileService;
}());
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=userProfile.service.js.map