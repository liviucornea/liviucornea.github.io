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
var apiService_1 = require("../../../../ReusableServices/apiService");
var httpAbstract_1 = require("../../../../ReusableServices/httpAbstract");
var adminApiService_1 = require("../adminApiService");
var genericfunctions_1 = require("../../../../ReusableServices/genericfunctions");
var AdminAuthApiService = (function () {
    function AdminAuthApiService(httpAbs, apiService, adminApiService) {
        this.httpAbs = httpAbs;
        this.apiService = apiService;
        this.adminApiService = adminApiService;
        this.prefixurl = '/auth';
        this.contentType = 'application/json; charset=utf-8';
        this.userbaseurl = this.prefixurl + '/user';
        this.rolebaseurl = this.prefixurl + '/role';
        this.resourcebaseurl = this.prefixurl + '/resource';
        this.roleresourcebaseurl = this.prefixurl + '/roleresource';
        this.userrolebaseurl = this.prefixurl + '/userrole';
        this.latestalertbaseurl = '/notification/getalert?UserId=';
        this.alertbaseurl = '/notification/alert';
        this.applicationsListUrl = this.prefixurl + '/application';
        this.roleApplicationUrl = this.prefixurl + '/roleapplication';
        this.roleApplicationMenuItemUrl = this.prefixurl + '/roleapplicationmenuitem';
        this.roleapplicationresource = this.prefixurl + '/roleapplicationresource';
        this.httpAbs.setBaseAddress(this.apiService.base);
    }
    AdminAuthApiService.prototype.getUserFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.userbaseurl + '/paged', filter, this.contentType);
    };
    AdminAuthApiService.prototype.getAuthUserRolesByUserId = function (id) {
        return this.httpAbs.fetch(this.userbaseurl + '/' + id + '/userrole');
    };
    AdminAuthApiService.prototype.createUserRole = function (obj) {
        return this.httpAbs.insertWithHeader(this.userrolebaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateUserRole = function (obj) {
        return this.httpAbs.updateWithHeader(this.userrolebaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteUserRole = function (obj) {
        return this.httpAbs.remove(this.userrolebaseurl + '/' + obj.Id);
    };
    AdminAuthApiService.prototype.getRoleFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.rolebaseurl + '/paged', filter, this.contentType);
    };
    AdminAuthApiService.prototype.getAuthUser = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbs.fetch(this.userbaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.userbaseurl);
        }
    };
    AdminAuthApiService.prototype.createAuthUser = function (obj) {
        return this.httpAbs.insertWithHeader(this.userbaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateAuthUser = function (obj) {
        return this.httpAbs.updateWithHeader(this.userbaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteAuthUser = function (obj) {
        return this.httpAbs.remove(this.userbaseurl + '/' + obj.Id);
    };
    AdminAuthApiService.prototype.getAuthRole = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbs.fetch(this.rolebaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.rolebaseurl);
        }
    };
    AdminAuthApiService.prototype.createAuthRole = function (obj) {
        return this.httpAbs.insertWithHeader(this.rolebaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateAuthRole = function (obj) {
        return this.httpAbs.updateWithHeader(this.rolebaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteAuthRole = function (obj) {
        return this.httpAbs.remove(this.rolebaseurl + '/' + obj.Id);
    };
    AdminAuthApiService.prototype.getAuthResource = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbs.fetch(this.resourcebaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.resourcebaseurl);
        }
    };
    AdminAuthApiService.prototype.getResourceFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.resourcebaseurl + '/paged', filter, this.contentType);
    };
    AdminAuthApiService.prototype.createAuthResource = function (obj) {
        return this.httpAbs.insertWithHeader(this.resourcebaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateAuthResource = function (obj) {
        return this.httpAbs.updateWithHeader(this.resourcebaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteAuthResource = function (obj) {
        return this.httpAbs.remove(this.resourcebaseurl + '/' + obj.Id);
    };
    AdminAuthApiService.prototype.getAuthRoleResource = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbs.fetch(this.roleresourcebaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.roleresourcebaseurl);
        }
    };
    AdminAuthApiService.prototype.getAuthRoleByResourceId = function (id) {
        return this.httpAbs.fetch(this.resourcebaseurl + '/' + id + '/roleresource');
    };
    AdminAuthApiService.prototype.getAuthRoleByRoleId = function (id) {
        return this.httpAbs.fetch(this.rolebaseurl + '/' + id + '/roleresource');
    };
    AdminAuthApiService.prototype.createAuthRoleResource = function (obj) {
        return this.httpAbs.insertWithHeader(this.roleresourcebaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateAuthRoleResource = function (obj) {
        return this.httpAbs.updateWithHeader(this.roleresourcebaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteAuthRoleResource = function (obj) {
        return this.httpAbs.remove(this.roleresourcebaseurl + '/' + obj.Id);
    };
    AdminAuthApiService.prototype.getAuthUserRole = function () {
        return this.httpAbs.fetch(this.userrolebaseurl);
    };
    AdminAuthApiService.prototype.createAuthUserRole = function (obj) {
        return this.httpAbs.insertWithHeader(this.userrolebaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateAuthUserRole = function (obj) {
        return this.httpAbs.updateWithHeader(this.userrolebaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteAuthUserRole = function (obj) {
        return this.httpAbs.remove(this.userrolebaseurl + '/' + obj.Id);
    };
    //Notification Alert functions
    AdminAuthApiService.prototype.getLatestAlert = function (id) {
        return this.httpAbs.fetch(this.latestalertbaseurl + id);
    };
    AdminAuthApiService.prototype.getNotificationAlerts = function (id) {
        if (id === void 0) { id = null; }
        if (id) {
            return this.httpAbs.fetch(this.alertbaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.alertbaseurl);
        }
    };
    AdminAuthApiService.prototype.getAlertFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.alertbaseurl + '/paged', filter, this.contentType);
    };
    AdminAuthApiService.prototype.createNotificationAlert = function (obj) {
        return this.httpAbs.insertWithHeader(this.alertbaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateNotificationAlert = function (obj) {
        return this.httpAbs.updateWithHeader(this.alertbaseurl + '/' + obj.Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    //Applications List region
    AdminAuthApiService.prototype.getAuthApplicationsList = function () {
        return this.httpAbs.fetch(this.applicationsListUrl);
    };
    AdminAuthApiService.prototype.createAuthApplication = function (obj) {
        return this.httpAbs.insertWithHeader(this.applicationsListUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateAuthApplication = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.applicationsListUrl + '/' + id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteAuthApplication = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.applicationsListUrl + '/' + id);
    };
    //RoleApplication Region
    AdminAuthApiService.prototype.getRoleApplicationUrl = function (applicationId) {
        return this.applicationsListUrl + '/' + applicationId + '/roleapplication';
    };
    AdminAuthApiService.prototype.getApplicationRolesByApplicationId = function (applicationId) {
        return this.httpAbs.fetch(this.getRoleApplicationUrl(applicationId));
    };
    AdminAuthApiService.prototype.deleteApplicationRole = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.roleApplicationUrl + '/' + id);
    };
    AdminAuthApiService.prototype.createRoleApplication = function (obj) {
        return this.httpAbs.insertWithHeader(this.roleApplicationUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.updateRoleApplication = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleApplicationUrl + '/' + id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.getRoleApplicationMenuItems = function (roleApplicationId) {
        return this.httpAbs.fetch(this.roleApplicationUrl + '/' + roleApplicationId + '/roleapplicationmenuitem');
    };
    AdminAuthApiService.prototype.updateRoleApplicationMenuItem = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleApplicationMenuItemUrl + '/' + id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.createRoleApplicationMenuItem = function (obj) {
        return this.httpAbs.insertWithHeader(this.roleApplicationMenuItemUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteRoleApplicationMenuItem = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.roleApplicationMenuItemUrl + '/' + id);
    };
    AdminAuthApiService.prototype.getRoleApplicationResources = function (roleApplicationId) {
        return this.httpAbs.fetch(this.roleApplicationUrl + '/' + roleApplicationId + '/roleapplicationresource');
    };
    AdminAuthApiService.prototype.updateRoleApplicationResources = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleapplicationresource + '/' + id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.createRoleApplicationResources = function (obj) {
        return this.httpAbs.insertWithHeader(this.roleapplicationresource, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminAuthApiService.prototype.deleteRoleApplicationResources = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.roleapplicationresource + '/' + id);
    };
    AdminAuthApiService.prototype.getAutoCompleteInfo = function (componentName) {
        return this.getAuthApplicationsList();
    };
    AdminAuthApiService.prototype.ExecuteUpdate = function (obj, pagename, primaryKeyColumn) {
        if (primaryKeyColumn === void 0) { primaryKeyColumn = ""; }
        switch (pagename.toLowerCase()) {
            case "user":
                return this.updateAuthUser(obj);
            case "role":
                return this.updateAuthRole(obj);
            case "resource":
                return this.updateAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.updateAuthRoleResource(obj);
            case "user_child":
                return this.updateUserRole(obj);
            case "alert":
                return this.updateNotificationAlert(obj);
            case "applicationslist":
                return this.updateAuthApplication(obj, primaryKeyColumn);
            case "applicationslist_child":
                return this.updateRoleApplication(obj, primaryKeyColumn);
            case "roleapplicationmenuitem":
                return this.updateRoleApplicationMenuItem(obj, primaryKeyColumn);
            case "roleapplicationresource":
                return this.updateRoleApplicationResources(obj, primaryKeyColumn);
        }
    };
    AdminAuthApiService.prototype.ExecutePageFilter = function (pagename, filterObject) {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.getUserFiltered(filterObject);
            case "role":
                return this.getRoleFiltered(filterObject);
            case "resource":
                return this.getResourceFiltered(filterObject);
            case "alert":
                return this.getAlertFiltered(filterObject);
        }
    };
    AdminAuthApiService.prototype.ExecutePageRefresh = function (pagename, id) {
        if (id === void 0) { id = null; }
        switch (pagename.toLowerCase()) {
            case "user":
                return this.getAuthUser();
            case "role":
                return this.getAuthRole();
            case "resource":
                return this.getAuthResource();
            case "role_child":
                return this.getAuthRoleByRoleId(id);
            case "resource_child":
                return this.getAuthRoleByResourceId(id);
            case "user_child":
                return this.getAuthUserRolesByUserId(id);
            case "alert":
                return this.getNotificationAlerts(id);
            case "applicationslist":
                return this.getAuthApplicationsList();
            case "applicationslist_child":
                return this.getApplicationRolesByApplicationId(id);
            case "roleapplicationmenuitem":
                return this.getRoleApplicationMenuItems(id);
            case "roleapplicationresource":
                return this.getRoleApplicationResources(id);
        }
    };
    AdminAuthApiService.prototype.ExecuteDelete = function (obj, pagename, primaryKeyColumn) {
        if (primaryKeyColumn === void 0) { primaryKeyColumn = ""; }
        switch (pagename.toLowerCase()) {
            case "user":
                return this.deleteAuthUser(obj);
            case "role":
                return this.deleteAuthRole(obj);
            case "resource":
                return this.deleteAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.deleteAuthRoleResource(obj);
            case "user_child":
                return this.deleteUserRole(obj);
            case "applicationslist":
                return this.deleteAuthApplication(obj, primaryKeyColumn);
            case "applicationslist_child":
                return this.deleteApplicationRole(obj, primaryKeyColumn);
            case "roleapplicationmenuitem":
                return this.deleteRoleApplicationMenuItem(obj, primaryKeyColumn);
            case "roleapplicationresource":
                return this.deleteRoleApplicationResources(obj, primaryKeyColumn);
        }
    };
    AdminAuthApiService.prototype.ExecuteInsert = function (obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.createAuthUser(obj);
            case "role":
                return this.createAuthRole(obj);
            case "resource":
                return this.createAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.createAuthRoleResource(obj);
            case "user_child":
                return this.createUserRole(obj);
            case "alert":
                return this.createNotificationAlert(obj);
            case "applicationslist":
                return this.createAuthApplication(obj);
            case "applicationslist_child":
                return this.createRoleApplication(obj);
            case "roleapplicationmenuitem":
                return this.createRoleApplicationMenuItem(obj);
            case "roleapplicationresource":
                return this.createRoleApplicationResources(obj);
        }
    };
    AdminAuthApiService.prototype.checkBusinessValidations = function (inputRecords, pageName) {
        switch (pageName.toLowerCase()) {
            case "userrolegrid":
                inputRecords.forEach(function (x) {
                    x.checkBox.checked = (x.primaryKey && x.primaryKey.value) ? true : false;
                });
                break;
        }
    };
    AdminAuthApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, apiService_1.ApiService, adminApiService_1.AdminApiService])
    ], AdminAuthApiService);
    return AdminAuthApiService;
}());
exports.AdminAuthApiService = AdminAuthApiService;
//# sourceMappingURL=adminAuthApiService.js.map