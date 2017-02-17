"use strict";
var core_1 = require('@angular/core');
var httpAbstract_1 = require("../../../ReusableServices/httpAbstract");
var genericfunctions_1 = require("../../../ReusableServices/genericfunctions");
var apiService_1 = require("../../../ReusableServices/apiService");
var AdminApiService = (function () {
    function AdminApiService(httpAbs, apiService) {
        this.httpAbs = httpAbs;
        this.apiService = apiService;
        this.prefixurl = '/auth';
        this.contentType = 'application/json; charset=utf-8';
        this.logbaseurl = '/log';
        this.treemodelmetadataUrl = '/ui/treemodelmetadata';
        this.menuItemUrl = this.prefixurl + '/menuitem';
        this.roleMenuItemUrl = this.prefixurl + '/rolemenuitem';
        this.metaDataTreeViewUrl = '/ui/treemodelmetadata';
        this.publishTreeView = '/treemodel/publish';
        this.httpAbs.setBaseAddress(this.apiService.base);
    }
    AdminApiService.prototype.getLogHeader = function () {
        return this.httpAbs.fetch(this.logbaseurl + '/logheaderview');
    };
    AdminApiService.prototype.getLogHeaderFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.logbaseurl + '/logheaderview/paged', filter, this.contentType);
    };
    AdminApiService.prototype.getLogDetail = function (taskGUID) {
        return this.httpAbs.fetch(this.logbaseurl + '/TaskGUID/' + taskGUID + '/logdetailview');
    };
    AdminApiService.prototype.getLogDetailFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.logbaseurl + '/logdetailview/paged', filter, this.contentType);
    };
    AdminApiService.prototype.updateLog = function (obj) {
        return this.httpAbs.updateWithHeader(this.logbaseurl + '/logheaderview/update', JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    //TreeModelMetadata
    AdminApiService.prototype.getTreeModeMetadataByRootName = function (rootName) {
        return this.httpAbs.fetch(this.treemodelmetadataUrl + '?RootModelName=' + rootName);
    };
    //MenuItems List
    AdminApiService.prototype.getMenuItems = function () {
        return this.httpAbs.fetch(this.menuItemUrl);
    };
    AdminApiService.prototype.updateMenuItem = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.menuItemUrl + '/' + id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.createMenuItem = function (obj) {
        return this.httpAbs.insertWithHeader(this.menuItemUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.deleteMenuItem = function (obj, primaryKeyColumn) {
        var id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.menuItemUrl + '/' + id);
    };
    //RoleMenuItems
    AdminApiService.prototype.getMenuItemsRoleByMenuItemId = function (id) {
        return this.httpAbs.fetch(this.menuItemUrl + '/' + id + '/rolemenuitem');
    };
    AdminApiService.prototype.createMenuItemRole = function (obj) {
        return this.httpAbs.insertWithHeader(this.roleMenuItemUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.updateMenuItemRole = function (obj, primaryKeyColumn) {
        var Id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleMenuItemUrl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.deleteMenuItemRole = function (obj, primaryKeyColumn) {
        var Id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.roleMenuItemUrl + '/' + Id);
    };
    AdminApiService.prototype.getTreemodelmetadataList = function () {
        return this.httpAbs.fetch(this.metaDataTreeViewUrl);
    };
    AdminApiService.prototype.updateTreemodelmetadata = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.metaDataTreeViewUrl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.deleteTreemodelmetadata = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.metaDataTreeViewUrl + '/' + Id);
    };
    AdminApiService.prototype.createTreemodelmetadata = function (obj) {
        return this.httpAbs.insertWithHeader(this.metaDataTreeViewUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.publishTreemodelmetadata = function (rootModelName) {
        return this.httpAbs.insertWithHeader(this.publishTreeView + "/" + rootModelName, '' // rootModelName
        , '', '' //empty headers
        , this.contentType);
    };
    AdminApiService.prototype.getRolesByPage = function () {
        return this.httpAbs.fetch(this.metaDataTreeViewUrl);
    };
    AdminApiService.prototype.ExecuteUpdate = function (obj, pagename, primaryKeyColumn) {
        if (primaryKeyColumn === void 0) { primaryKeyColumn = ""; }
        switch (pagename.toLowerCase()) {
            case "logs":
                return this.updateLog(obj);
            case "menuitem":
                return this.updateMenuItem(obj, primaryKeyColumn);
            case "menuitem_child":
                return this.updateMenuItemRole(obj, primaryKeyColumn);
        }
    };
    AdminApiService.prototype.ExecutePageFilter = function (pagename, filterObject) {
        switch (pagename.toLowerCase()) {
            case "logs":
                return this.getLogHeaderFiltered(filterObject);
            case "logs_child":
                return this.getLogDetailFiltered(filterObject);
        }
    };
    AdminApiService.prototype.ExecutePageRefresh = function (pagename, id) {
        if (id === void 0) { id = null; }
        switch (pagename.toLowerCase()) {
            case "logs":
                return this.getLogHeader();
            case "logs_child":
                return this.getLogDetail(id);
            case "menuitem":
                return this.getMenuItems();
            case "menuitem_child":
                return this.getMenuItemsRoleByMenuItemId(id);
        }
    };
    AdminApiService.prototype.ExecuteDelete = function (obj, pagename, primaryKeyColumn) {
        if (primaryKeyColumn === void 0) { primaryKeyColumn = ""; }
        switch (pagename.toLowerCase()) {
            case "menuitem_child":
                return this.deleteMenuItemRole(obj, primaryKeyColumn);
            case "menuitem":
                return this.deleteMenuItem(obj, primaryKeyColumn);
        }
    };
    AdminApiService.prototype.ExecuteInsert = function (obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "menuitem":
                return this.createMenuItem(obj);
            case "menuitem_child":
                return this.createMenuItemRole(obj);
        }
    };
    AdminApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, apiService_1.ApiService])
    ], AdminApiService);
    return AdminApiService;
}());
exports.AdminApiService = AdminApiService;
//# sourceMappingURL=adminApiService.js.map