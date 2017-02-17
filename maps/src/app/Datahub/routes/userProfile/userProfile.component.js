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
 * Created by vikhnv2 on 11/29/2016.
 */
var core_1 = require('@angular/core');
var apiService_1 = require('../../../ReusableServices/apiService');
var userProfile_config_1 = require('./userProfile.config');
var userProfile_service_1 = require('./userProfile.service');
var collapsePanel_component_1 = require('../../../ReusableComponents/collapsePanel/collapsePanel.component');
var UserProfile = (function () {
    function UserProfile(_apiService, _upService) {
        var _this = this;
        this._apiService = _apiService;
        this._upService = _upService;
        this.panelsConfigSection = userProfile_config_1.CollapsePanelConfig.Panels;
        this.panelsConfigInfo = [];
        // read and load panels' configuration.
        this.panelsConfigSection.forEach(function (x) {
            _this.panelsConfigInfo.push({
                Key: x.DataSetKey,
                DataGrid: x.GridConfiguration,
                Title: x.Title
            });
        });
    }
    UserProfile.prototype.ngOnInit = function () {
        var _this = this;
        // load current user' base profile information.
        this.user = new apiService_1.AuthUser();
        var subscription = this._apiService.getAuthCurrentUser().subscribe(function (res) {
            subscription.unsubscribe();
            _this.user.CostCentre = res.CostCentre;
            _this.user.Id = res.Id;
            _this.user.Login = res.Login;
            _this.user.Name = res.Name;
            // load profile details.
            _this.populateUserProfile();
        }, function (err) {
            subscription.unsubscribe();
            console.log(err);
            // this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
        });
    };
    UserProfile.prototype.populateUserProfile = function () {
        var _this = this;
        var subscription = this._upService.getAuthUserProfile().subscribe(function (res) {
            // console.log(res);
            subscription.unsubscribe();
            // re-build panels' data based based on columns defined in the configuration.
            var panelsData = [];
            _this.panelsConfigInfo.forEach(function (section) {
                var ds = res[section.Key]; //gets a key-based DataSet.
                if (ds && ds.length > 0) {
                    panelsData.push({
                        Key: section.Key,
                        DataGridConfig: section.DataGrid,
                        Data: ds
                    });
                }
            });
            // load data content into a target panel.
            panelsData.forEach(function (item) {
                _this.collapsePanels.find(function (pnl) { return pnl.key === item.Key; }).setPanelContent(item.DataGridConfig, item.Data);
            });
        }, function (err) {
            subscription.unsubscribe();
            console.log(err);
            // this.alert.error(AppNotificationsMSG.apiMsg.apiGetUserInfo + '   ' + error.status);
        });
    };
    UserProfile.prototype.expandCollapseAll = function (collapse) {
        this.collapsePanels.forEach(function (p) { return p.collapsePanel(collapse); });
    };
    __decorate([
        core_1.ViewChildren(collapsePanel_component_1.CollapsePanel), 
        __metadata('design:type', core_1.QueryList)
    ], UserProfile.prototype, "collapsePanels", void 0);
    UserProfile = __decorate([
        core_1.Component({
            selector: 'user-profile',
            template: require('./userProfile.html'),
            styles: [require('./userProfile.scss')]
        }), 
        __metadata('design:paramtypes', [apiService_1.ApiService, userProfile_service_1.UserProfileService])
    ], UserProfile);
    return UserProfile;
}());
exports.UserProfile = UserProfile;
//# sourceMappingURL=userProfile.component.js.map