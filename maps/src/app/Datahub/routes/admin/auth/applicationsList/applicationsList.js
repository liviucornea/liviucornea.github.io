"use strict";
var core_1 = require("@angular/core");
var tabBuilder_1 = require("../../../../../ReusableComponents/tabBuilder/tabBuilder");
var applicationsListControlConfig_1 = require("./applicationsListControlConfig");
var alertService_1 = require("../../../../../ReusableServices/alertService");
var apiService_1 = require("../../../../../ReusableServices/apiService");
var matrixService_1 = require("../../../../../ReusableServices/matrixService");
var adminAuthApiService_1 = require("../adminAuthApiService");
var adminApiService_1 = require("../../adminApiService");
var ApplicationsList = (function () {
    function ApplicationsList(alert, apiService, vmMatrix, adminAuthApiService, adminApiService) {
        this.alert = alert;
        this.apiService = apiService;
        this.vmMatrix = vmMatrix;
        this.adminAuthApiService = adminAuthApiService;
        this.adminApiService = adminApiService;
        this.tabsListData = [];
        this.tabControlConfig = applicationsListControlConfig_1.ApplicationsListTabConfig;
        this.updatedControlsList = [];
        this.customMessages = [];
        this.rolesList = [];
        this.selectedApplicationId = 0;
        this.selectedRoleApplicationId = 0;
    }
    ApplicationsList.prototype.ngOnInit = function () {
        this.getTabsData();
    };
    ApplicationsList.prototype.ngOnDestroy = function () {
        this.tabsListData = [];
    };
    ApplicationsList.prototype.getTabsData = function () {
        var _this = this;
        this.tabControlConfig.TabsList.forEach(function (x) {
            _this.tabsListData.push({
                TabKey: x.TabKey,
                TabName: x.TabName
            });
        });
    };
    ApplicationsList.prototype.showSpecificTab = function (tabData) {
        this.vmMatrix.showSpecificTab(this, tabData, this.adminAuthApiService);
    };
    ApplicationsList.prototype.displayTabInfo = function (tabInfo) {
        var _this = this;
        this.selectedTabInfo = tabInfo;
        this.formBuilder = null;
        switch (tabInfo.TabKey) {
            case "Resources":
                var menuItemControl = tabInfo.TabControls.find(function (p) { return p.ComponentName == "menuitem"; });
                if (menuItemControl) {
                    menuItemControl['httpProxy'] = this.adminApiService;
                }
                this.tabBuilderControl.displayTabInfo(tabInfo);
                break;
            case "ApplicationRoles":
                this.formBuilder = tabInfo.TabControls.find(function (x) { return x.ComponentName == "applicationroles"; });
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                tabInfo.TabControls.forEach(function (x) {
                    if (x.ComponentName == "roleapplicationmenuitem" || x.ComponentName == "roleapplicationresource") {
                        x.ShowDefault = false;
                    }
                });
                if (!this.rolesList.length) {
                    this.adminAuthApiService.getAuthRole().subscribe(function (res) {
                        _this.rolesList = res;
                        _this.tabBuilderControl.displayTabInfo(tabInfo);
                    }, function (error) {
                        _this.alert.error('Error in retrieving Roles' + error.status);
                    });
                }
                else {
                    this.tabBuilderControl.displayTabInfo(tabInfo);
                }
                break;
            default:
                this.tabBuilderControl.displayTabInfo(tabInfo);
                break;
        }
    };
    ApplicationsList.prototype.doActionFromChildTab = function (outputData) {
        switch (outputData.TabKey) {
            case "ApplicationRoles":
                this.executeApplicationRolesPage(outputData);
        }
    };
    ApplicationsList.prototype.executeApplicationRolesPage = function (outputData) {
        switch (outputData.updatedValue.controlName) {
            case "Application":
                this.selectedApplicationId = outputData.updatedValue.value;
                this.getApplicationRolesList();
                break;
            case "Role":
                this.selectedRoleApplicationId = outputData.updatedValue.value;
                this.displayRoleApplicationChildItems();
        }
    };
    ApplicationsList.prototype.getApplicationRolesList = function () {
        var _this = this;
        var applicationRolesList = [];
        if (this.selectedApplicationId) {
            this.adminAuthApiService.getApplicationRolesByApplicationId(this.selectedApplicationId).subscribe(function (res) {
                applicationRolesList = _this.getformattedRoleApplicationsList(res);
                var roleControl = _this.formBuilder.data.find(function (x) { return x.name == "Role"; });
                _this.vmMatrix.bindCustomDropDown(roleControl, applicationRolesList);
            }, function (error) {
                _this.alert.error('Error in retrieving Application Roles' + error.status);
            });
        }
    };
    ApplicationsList.prototype.getformattedRoleApplicationsList = function (applicationRolesList) {
        var _this = this;
        var formattedList = [];
        if (this.rolesList && this.rolesList.length && applicationRolesList && applicationRolesList.length) {
            applicationRolesList.forEach(function (x) {
                var tempRole = _this.rolesList.find(function (p) { return p.Id == x.RoleId; });
                if (tempRole) {
                    formattedList.push({
                        RoleApplicationId: x.Id,
                        Name: tempRole.Name
                    });
                }
            });
        }
        return formattedList;
    };
    ApplicationsList.prototype.displayRoleApplicationChildItems = function () {
        var _this = this;
        var updatedTabsList = [];
        if (this.selectedRoleApplicationId && this.selectedTabInfo) {
            this.apiService.fetchMultipleList([this.adminAuthApiService.roleApplicationUrl + '/' + this.selectedRoleApplicationId + '/roleapplicationmenuitem',
                this.adminAuthApiService.roleApplicationUrl + '/' + this.selectedRoleApplicationId + '/roleapplicationresource'
            ]).subscribe(function (res) {
                _this.selectedTabInfo.TabControls.forEach(function (x) {
                    if (x.ComponentName == "roleapplicationmenuitem" || x.ComponentName == "roleapplicationresource") {
                        x.data = (x.ComponentName == "roleapplicationmenuitem") ? res[0] : res[1];
                        x.parentIdInputValue = _this.selectedRoleApplicationId;
                        x.ShowDefault = true;
                        updatedTabsList.push(x);
                    }
                });
                _this.tabBuilderControl.LoadSpecificTabsByUpdate(updatedTabsList);
            }, function (error) {
                _this.alert.error('Error in retrieving Application Roles Menu and Resources' + error.status);
            });
        }
    };
    __decorate([
        core_1.ViewChild(tabBuilder_1.TabBuilder), 
        __metadata('design:type', tabBuilder_1.TabBuilder)
    ], ApplicationsList.prototype, "tabBuilderControl", void 0);
    ApplicationsList = __decorate([
        core_1.Component({
            selector: 'applicationsList',
            template: "<tabBuilder [tabsList]=\"tabsListData\" [messages] = \"customMessages\"\n            (tabEmitter)=\"showSpecificTab($event)\"\n            (tabContentEmitter)=\"doActionFromChildTab($event)\"></tabBuilder>"
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, apiService_1.ApiService, matrixService_1.matrixService, adminAuthApiService_1.AdminAuthApiService, adminApiService_1.AdminApiService])
    ], ApplicationsList);
    return ApplicationsList;
}());
exports.ApplicationsList = ApplicationsList;
//# sourceMappingURL=applicationsList.js.map