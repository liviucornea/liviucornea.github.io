"use strict";
var core_1 = require('@angular/core');
var alertService_1 = require("../../../../ReusableServices/alertService");
var appSettingsService_1 = require("../../../../ReusableServices/appSettingsService");
var menuItemControlConfig_1 = require("../auth/menuItem/menuItemControlConfig");
var adminApiService_1 = require("../adminApiService");
var ApplicationBuilder = (function () {
    /*@ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;*/
    function ApplicationBuilder(adminApiService, alert, appSettingsService) {
        this.adminApiService = adminApiService;
        this.alert = alert;
        this.appSettingsService = appSettingsService;
        this.showControls = false;
        this.treeViewMetadataTemplate = { ConnectionString: "", MetadataJSON: "", RootModelName: "", TreeModelMetadataId: 0, Route: "", PublishDate: "", MenuItemName: "", MenuItemId: 0 };
        this.primaryKeyColumn = "TreeModelMetadataId";
        this.pageView = "edit";
        this.showPublishButton = false;
        this.menuItemExists = false;
        this.menuItemsList = [];
        this.menuPageName = 'menuitem_child';
        this.menuRoleItemcontrolConfig = menuItemControlConfig_1.MenuItemControlConfig.ChildControlConfig;
        this.selectedTreeModelMetadata = this.treeViewMetadataTemplate;
        this.getTreeViewMetadataList();
    }
    /*ngAfterViewInit() {
        this.refreshMenuItemRoles();
    }*/
    ApplicationBuilder.prototype.saveClicked = function () {
        if (this.selectedTreeModelMetadata) {
            if (this.selectedTreeModelMetadata.MenuItemId > 0) {
                this.processTreeViewdata();
            }
            else {
                this.addMenuItem();
            }
        }
    };
    ApplicationBuilder.prototype.addMenuItem = function () {
        var _this = this;
        var menuItemObj = {
            Id: 0,
            LookupKey: this.selectedTreeModelMetadata.MenuItemName,
            Route: this.selectedTreeModelMetadata.Route,
            VersionStamp: ""
        };
        this.adminApiService.createMenuItem(menuItemObj).subscribe(function (res) {
            _this.adminApiService.getMenuItems().subscribe(function (res) {
                _this.menuItemsList = res;
                _this.processTreeViewdata();
            }, function (error) { }, function () { });
        }, function (error) { _this.alert.error("Error in creating new MenuItem: async error #" + error.status); }, function () { });
    };
    ApplicationBuilder.prototype.processTreeViewdata = function () {
        if (this.selectedTreeModelMetadata) {
            var x = this.buildUIToApiTreeViewTemplate(this.selectedTreeModelMetadata); // this.selectedTreeModelMetadata;
            if (this.pageView == 'edit') {
                this.saveTreeViewdata(x);
            }
            else {
                this.addTreeViewdata(x);
            }
        }
    };
    ApplicationBuilder.prototype.saveTreeViewdata = function (x) {
        var _this = this;
        this.adminApiService.updateTreemodelmetadata(x, this.primaryKeyColumn).subscribe(function (res) {
            _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
            _this.getTreeViewSchemaList();
        }, function (error) {
            _this.alert.error("Error in Updating MetaData: async error #" + error.status);
        }, function () { });
    };
    ApplicationBuilder.prototype.addTreeViewdata = function (x) {
        var _this = this;
        this.adminApiService.createTreemodelmetadata(x).subscribe(function (res) {
            _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
            _this.getTreeViewSchemaList();
        }, function (error) {
            _this.alert.error("Error in Adding MetaData: async error #" + error.status);
        }, function () { });
    };
    ApplicationBuilder.prototype.addClicked = function () {
        this.pageView = "add";
        this.showControls = true;
        this.selectedTreeModelMetadata = JSON.parse(JSON.stringify(this.treeViewMetadataTemplate));
    };
    ApplicationBuilder.prototype.cancelClicked = function () {
        this.pageView = "edit";
        if (this.selectedTreeModelMetadata.TreeModelMetadataId > 0) {
            this.populateSelectedSchema(this.selectedTreeModelMetadata.TreeModelMetadataId);
        }
        else {
            var len = this.treeModelMetadataList.length;
            if (len > 0) {
                this.populateSelectedSchema(this.treeModelMetadataList[len - 1].TreeModelMetadataId);
            }
            else {
                this.showControls = false;
            }
        }
    };
    ApplicationBuilder.prototype.deleteClicked = function () {
        var _this = this;
        if (this.selectedTreeModelMetadata && this.pageView == "edit") {
            this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
            this.alert.requestConfirmationAnswer$.subscribe(function (item) {
                _this.alert.askConfirmation = false;
                if (item != "OK")
                    return;
                _this.deleteSelectedSchema();
            });
        }
    };
    ApplicationBuilder.prototype.deleteSelectedSchema = function () {
        var _this = this;
        var x = this.selectedTreeModelMetadata;
        this.adminApiService.deleteTreemodelmetadata(x, this.primaryKeyColumn).subscribe(function (res) {
            _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.deletionConfirmationMsg);
            //reset the values
            _this.selectedTreeModelMetadata = JSON.parse(JSON.stringify(_this.treeViewMetadataTemplate));
            _this.selectedTreeModelMetadataId = 0;
            _this.getTreeViewSchemaList();
        }, function (error) {
            _this.alert.error("Error in Deleting MetaData: async error #" + error.status);
        }, function () { });
    };
    ApplicationBuilder.prototype.getTreeViewMetadataList = function () {
        var _this = this;
        this.pageView = "edit";
        this.showControls = false;
        this.adminApiService.getMenuItems().subscribe(function (res) {
            _this.menuItemsList = res;
            _this.getTreeViewSchemaList();
        }, function (error) { _this.alert.error("Error in retrieving MenuItems List: async error #" + error.status); }, function () { });
    };
    ApplicationBuilder.prototype.getTreeViewSchemaList = function () {
        var _this = this;
        this.pageView = "edit";
        this.showControls = false;
        this.adminApiService.getTreemodelmetadataList().subscribe(function (res) {
            _this.treeModelMetadataList = res;
            if (_this.selectedTreeModelMetadata.TreeModelMetadataId > 0) {
                _this.populateSelectedSchema(_this.selectedTreeModelMetadata.TreeModelMetadataId);
            }
            else {
                var len = _this.treeModelMetadataList.length;
                if (len > 0) {
                    _this.populateSelectedSchema(_this.treeModelMetadataList[len - 1].TreeModelMetadataId);
                }
            }
        }, function (error) {
            _this.alert.error("Error in retrieving MetaData List: async error #" + error.status);
        }, function () { });
    };
    ApplicationBuilder.prototype.populateSelectedSchema = function (selectedValue) {
        this.showControls = true;
        this.menuItemExists = false;
        this.selectedTreeModelMetadataId = selectedValue;
        this.showPublishButton = false;
        //Convert to string and back to json -> to convert reference type data to value type
        this.buildApiToUITreeViewTemplate(JSON.parse(JSON.stringify(this.getSelectedSchema(selectedValue))));
        if (this.selectedTreeModelMetadata && !this.selectedTreeModelMetadata.PublishDate) {
            this.showPublishButton = true;
        }
        //this.refreshMenuItemRoles();
    };
    ApplicationBuilder.prototype.getSelectedSchema = function (selectedValue) {
        return this.treeModelMetadataList.find(function (p) { return p.TreeModelMetadataId == selectedValue; });
    };
    ApplicationBuilder.prototype.publishClicked = function () {
        var _this = this;
        var metaDataToPublish = this.getSelectedSchema(this.selectedTreeModelMetadataId);
        if (metaDataToPublish) {
            //if(this.selectedTreeModelMetadata && this.selectedTreeModelMetadata.MetadataJSON) {
            this.adminApiService.publishTreemodelmetadata(metaDataToPublish.RootModelName).subscribe(function (res) {
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                _this.getTreeViewSchemaList();
            }, function (error) {
                _this.alert.error("Error in Publishing MetaData: async error #" + error.status);
            }, function () {
            });
        }
    };
    ApplicationBuilder.prototype.checkMenuItem = function () {
        var _this = this;
        var menuItemId = 0;
        var route = "";
        this.menuItemExists = false;
        //var menuItemValue = this.selectedTreeModelMetadata.MenuItemName;
        var tempMenuItem = this.menuItemsList.find(function (p) { return p.LookupKey.toLowerCase() === _this.selectedTreeModelMetadata.MenuItemName.toLowerCase(); });
        if (tempMenuItem) {
            menuItemId = tempMenuItem.Id;
            route = tempMenuItem.Route;
        }
        this.selectedTreeModelMetadata.MenuItemId = menuItemId;
        this.selectedTreeModelMetadata.Route = route;
        if (menuItemId > 0) {
            if (this.treeModelMetadataList.find(function (p) { return p.MenuItemId == menuItemId && p.TreeModelMetadataId != _this.selectedTreeModelMetadata.TreeModelMetadataId; })) {
                this.menuItemExists = true;
            }
        }
    };
    ApplicationBuilder.prototype.buildApiToUITreeViewTemplate = function (obj) {
        var tempMenuItem;
        var menuItemRoute = "";
        var menuItemName = "";
        var menuItemId = 0;
        if (obj.MenuItemId) {
            tempMenuItem = this.menuItemsList.find(function (p) { return p.Id == obj.MenuItemId; });
            if (tempMenuItem) {
                menuItemRoute = tempMenuItem.Route;
                menuItemName = tempMenuItem.LookupKey;
                menuItemId = obj.MenuItemId;
            }
        }
        this.selectedTreeModelMetadataId = obj.TreeModelMetadataId;
        this.selectedTreeModelMetadata = {
            ConnectionString: obj.ConnectionString,
            MetadataJSON: obj.MetadataJSON,
            RootModelName: obj.RootModelName,
            TreeModelMetadataId: obj.TreeModelMetadataId,
            Route: menuItemRoute,
            PublishDate: obj.PublishDate,
            MenuItemName: menuItemName,
            MenuItemId: menuItemId
        };
    };
    ApplicationBuilder.prototype.buildUIToApiTreeViewTemplate = function (objTreeView) {
        var tempMenuItem = this.menuItemsList.find(function (p) { return p.LookupKey.toLowerCase() == objTreeView.MenuItemName.toLowerCase(); });
        return {
            ConnectionString: objTreeView.ConnectionString,
            MetadataJSON: objTreeView.MetadataJSON,
            RootModelName: objTreeView.RootModelName,
            TreeModelMetadataId: objTreeView.TreeModelMetadataId,
            PublishDate: objTreeView.PublishDate,
            MenuItemId: tempMenuItem.Id
        };
    };
    ApplicationBuilder = __decorate([
        core_1.Component({
            selector: 'applicationBuilder',
            template: require('./applicationBuilder.html'),
        }), 
        __metadata('design:paramtypes', [adminApiService_1.AdminApiService, alertService_1.AlertService, appSettingsService_1.AppSettingsService])
    ], ApplicationBuilder);
    return ApplicationBuilder;
}());
exports.ApplicationBuilder = ApplicationBuilder;
//# sourceMappingURL=applicationBuilder.js.map