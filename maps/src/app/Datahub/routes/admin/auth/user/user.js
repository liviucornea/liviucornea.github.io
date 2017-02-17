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
var core_1 = require("@angular/core");
var userControlConfig_1 = require("./userControlConfig");
var adminAuthApiService_1 = require("../adminAuthApiService");
var tabBuilder_1 = require("../../../../../ReusableComponents/tabBuilder/tabBuilder");
var matrixService_1 = require("../../../../../ReusableServices/matrixService");
var apiService_1 = require("../../../../../ReusableServices/apiService");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var appSettingsService_1 = require("../../../../../ReusableServices/appSettingsService");
var AuthUser = (function () {
    function AuthUser(adminAuthApiService, vmMatrix, apiService, alert, appSettingsService) {
        this.adminAuthApiService = adminAuthApiService;
        this.vmMatrix = vmMatrix;
        this.apiService = apiService;
        this.alert = alert;
        this.appSettingsService = appSettingsService;
        this.controlConfig = userControlConfig_1.UserControlConfig;
        this.tabsListData = [];
        this.tabControlConfig = userControlConfig_1.UserTabControlConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.selectedUserId = 0;
    }
    AuthUser.prototype.ngOnInit = function () {
        this.tabsListData = [];
        this.getTabsData();
    };
    AuthUser.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    AuthUser.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    AuthUser.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.adminAuthApiService);
    };
    AuthUser.prototype.displayTabInfo = function (tabInfo) {
        switch (tabInfo.TabKey) {
            case 'UserRoles':
                var tempFormBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "userroleform"; });
                if (tempFormBuilder) {
                    tempFormBuilder.data = this.vmMatrix.getFormBuilderControls(tempFormBuilder.gridSettings);
                }
                var tempGrid = tabInfo.TabControls.find(function (x) { return x.ComponentName == "userrolegrid"; });
                if (tempGrid) {
                    tempGrid.ShowDefault = false;
                }
                break;
        }
        this.selectedTabInfo = tabInfo;
        this.tabBuilderControl.displayTabInfo(tabInfo);
    };
    AuthUser.prototype.doActionFromChildTab = function (outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Login":
                this.selectedUserId = outputData.updatedValue.value;
                this.getUserRoleTabInfo();
                break;
            case "Save":
                this.updateUserRoles(outputData);
                break;
            case "Cancel":
                this.getUserRoleTabInfo();
                break;
        }
    };
    AuthUser.prototype.getUserRoleTabInfo = function () {
        var _this = this;
        var updatedTabsList = [];
        this.apiService.getArrayFromQuery("Admin_UserRoleMembership", JSON.stringify({ Parameters: [{ Name: "@UserId", Value: this.selectedUserId }] })).subscribe(function (res) {
            if (_this.selectedTabInfo) {
                var userRolegrid = _this.selectedTabInfo.TabControls.find(function (p) { return p.ComponentName == 'userrolegrid'; });
                if (userRolegrid) {
                    userRolegrid['data'] = res;
                    userRolegrid.ShowDefault = true;
                    updatedTabsList.push(userRolegrid);
                    _this.tabBuilderControl.LoadSpecificTabsByUpdate(updatedTabsList);
                }
            }
        }, function (error) {
            _this.alert.error("Error in retrieving User role Membership info" + error.status);
        }, function () {
        });
    };
    AuthUser.prototype.updateUserRoles = function (outputData) {
        var _this = this;
        var rolesTobeAddedList = [];
        var addedUserRolesList = [];
        var rolesTobeRemovedList = [];
        var removedUserRolesList = [];
        if (outputData.updatedValue) {
            var selectedList = outputData.updatedValue.value;
            if (selectedList && selectedList.length) {
                rolesTobeAddedList = selectedList.filter(function (p) { return (!p.primaryKey.value) && p.checkBox.checked; });
            }
            var masterList = outputData.updatedValue.masterList;
            if (masterList && masterList.length) {
                rolesTobeRemovedList = masterList.filter(function (p) { return p.primaryKey.value && (!p.checkBox.checked); });
            }
        }
        rolesTobeAddedList.forEach(function (p) {
            var formattedUserRole = _this.buildUserRoleObject(p);
            addedUserRolesList.push(formattedUserRole);
        });
        rolesTobeRemovedList.forEach(function (p) {
            var formattedUserRole = _this.buildUserRoleObject(p);
            removedUserRolesList.push(formattedUserRole);
        });
        if (addedUserRolesList.length) {
            this.addUserRolesList(addedUserRolesList, removedUserRolesList);
        }
        else if (removedUserRolesList.length) {
            this.removeUserRolesList(removedUserRolesList);
        }
    };
    AuthUser.prototype.addUserRolesList = function (addedUserRolesList, removedUserRolesList) {
        var _this = this;
        if (removedUserRolesList === void 0) { removedUserRolesList = []; }
        this.apiService.insertBulkRecords('/auth/userrole/multiple', JSON.stringify(addedUserRolesList)).subscribe(function (res) {
            if (removedUserRolesList && removedUserRolesList.length) {
                _this.removeUserRolesList(removedUserRolesList);
            }
            else {
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                _this.getUserRoleTabInfo();
            }
        }, function (error) {
            _this.alert.error("Error in inserting User role Membership" + error.status);
        });
    };
    AuthUser.prototype.removeUserRolesList = function (removedUserRolesList) {
        var _this = this;
        this.apiService.removeBulkRecords('/auth/userrole/multiple', JSON.stringify(removedUserRolesList)).subscribe(function (res) {
            _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
            _this.getUserRoleTabInfo();
        }, function (error) {
            _this.alert.error("Error in deleting User role Membership" + error.status);
        });
    };
    AuthUser.prototype.buildUserRoleObject = function (rowInfo) {
        //Always expect a roleId. If not error
        var roleId = rowInfo.cells.find(function (p) { return p.name.toLowerCase() == 'roleid'; }).val;
        var id = rowInfo.primaryKey.value;
        if (!id) {
            id = 0;
        }
        var tempUserRole = new UserRole(id, roleId, this.selectedUserId);
        return tempUserRole;
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], AuthUser.prototype, "tabBuilderControl", void 0);
    AuthUser = __decorate([
        core_1.Component({
            selector: 'authUser',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>",
        }), 
        __metadata('design:paramtypes', [adminAuthApiService_1.AdminAuthApiService, matrixService_1.matrixService, apiService_1.ApiService, alertService_1.AlertService, appSettingsService_1.AppSettingsService])
    ], AuthUser);
    return AuthUser;
}());
exports.AuthUser = AuthUser;
var UserRole = (function () {
    function UserRole(id, roleId, userId) {
        this.VersionStamp = '';
        this.Id = id;
        this.RoleId = roleId;
        this.UserId = userId;
    }
    return UserRole;
}());
exports.UserRole = UserRole;
//# sourceMappingURL=user.js.map