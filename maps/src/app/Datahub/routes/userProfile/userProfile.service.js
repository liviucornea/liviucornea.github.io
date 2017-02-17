"use strict";
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