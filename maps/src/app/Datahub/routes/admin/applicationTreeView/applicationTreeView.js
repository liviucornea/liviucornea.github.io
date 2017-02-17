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
var alertService_1 = require("../../../../ReusableServices/alertService");
var router_1 = require("@angular/router");
var adminApiService_1 = require("../adminApiService");
var ApplicationTreeView = (function () {
    function ApplicationTreeView(alertService, activatedRoute, adminApiService) {
        this.alertService = alertService;
        this.activatedRoute = activatedRoute;
        this.adminApiService = adminApiService;
        this.apiUrl = '';
        this.showTreeViewdata = false;
    }
    ApplicationTreeView.prototype.ngOnInit = function () {
        var self = this;
        var treeName = '';
        var id;
        self.activatedRoute.params.forEach(function (params) {
            treeName = params['modelName'];
            id = params['id'];
            self.apiUrl = '/treemodel/' + treeName + '/' + id;
            self.populateApplicationTreeViewdata(treeName);
        });
    };
    ApplicationTreeView.prototype.populateApplicationTreeViewdata = function (treeName) {
        var _this = this;
        this.adminApiService.getTreeModeMetadataByRootName(treeName).subscribe(function (res) {
            _this.jsonSchemaConfig = JSON.parse(res.MetadataJSON);
            _this.showTreeViewdata = true;
        }, function (error) {
            _this.alertService.error("Error in retrieving json schema: async error #" + error.status);
        }, function () { });
    };
    ApplicationTreeView = __decorate([
        core_1.Component({
            selector: 'auth',
            template: "<treeViewBuilder *ngIf=\"showTreeViewdata\" [jsonConfig]=\"jsonSchemaConfig\" [treeViewApiUrl]=\"apiUrl\" ></treeViewBuilder>",
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, router_1.ActivatedRoute, adminApiService_1.AdminApiService])
    ], ApplicationTreeView);
    return ApplicationTreeView;
}());
exports.ApplicationTreeView = ApplicationTreeView;
//# sourceMappingURL=applicationTreeView.js.map