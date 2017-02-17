System.register(["@angular/core", "../adminAuthApiService", "../../../../../ReusableServices/apiService", "../../../../../ReusableServices/alertService", "./applicationRolesConfig"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, adminAuthApiService_1, apiService_1, alertService_1, applicationRolesConfig_1;
    var ApplicationRoles;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (adminAuthApiService_1_1) {
                adminAuthApiService_1 = adminAuthApiService_1_1;
            },
            function (apiService_1_1) {
                apiService_1 = apiService_1_1;
            },
            function (alertService_1_1) {
                alertService_1 = alertService_1_1;
            },
            function (applicationRolesConfig_1_1) {
                applicationRolesConfig_1 = applicationRolesConfig_1_1;
            }],
        execute: function() {
            ApplicationRoles = (function () {
                function ApplicationRoles(adminAuthApiService, apiService, alertService) {
                    this.adminAuthApiService = adminAuthApiService;
                    this.apiService = apiService;
                    this.alertService = alertService;
                    this.rolesList = [];
                    this.roleApplicationList = [];
                    this.selectedRoleApplicationId = 0;
                    this.associatedRolesList = [];
                    this.showRoles = false;
                    this.roleApplicationMenuItem = "roleapplicationmenuitem";
                    this.roleApplicationMenuItemConfig = applicationRolesConfig_1.RoleApplicationMenuItemConfig;
                    this.roleApplicationResourceConfig = applicationRolesConfig_1.RoleApplicationResourceConfig;
                    this.roleApplicationResource = "roleapplicationresource";
                }
                ApplicationRoles.prototype.ngOnInit = function () {
                    this.autocompleteInput = new Object();
                    this.autocompleteInput.searchApplications = this.searchApplications();
                };
                ApplicationRoles.prototype.searchApplications = function () {
                    var _this = this;
                    return function (filter) {
                        return new Promise(function (resolve, reject) {
                            var subscription = _this.adminAuthApiService.getAuthApplicationsList().subscribe(function (res) {
                                _this.applicationsList = res;
                                var outputList = new Array();
                                _this.applicationsList.forEach(function (x) {
                                    if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.Id == filter || filter.trim() === '')
                                        outputList.push({
                                            'id': x.Id,
                                            'text': x.LookupKey,
                                        });
                                });
                                resolve(outputList);
                                subscription.unsubscribe();
                            }, function (err) { return console.log("Error in search schematics", err); });
                        });
                    };
                };
                ApplicationRoles.prototype.onApplicationSelected = function (applicationInfo) {
                    this.selectedApplicationId = applicationInfo.id;
                    this.selectedRoleApplicationId = 0;
                    this.associatedRolesList = [];
                    if (this.selectedApplicationId > 0) {
                        this.getRolesByApplicationId();
                    }
                    else {
                        this.showRoles = false;
                    }
                };
                ApplicationRoles.prototype.getRolesByApplicationId = function () {
                    var _this = this;
                    if (this.selectedApplicationId) {
                        if (this.rolesList && this.rolesList.length) {
                            this.adminAuthApiService.getApplicationRolesByApplicationId(this.selectedApplicationId).subscribe(function (res) {
                                _this.roleApplicationList = res;
                                _this.populateRoleApplicationList();
                            }, function (error) {
                                _this.alertService.error('Error in retrieving Application Roles' + error.status);
                            });
                        }
                        else {
                            this.apiService.fetchMultipleList([this.adminAuthApiService.rolebaseurl,
                                this.adminAuthApiService.getRoleApplicationUrl(this.selectedApplicationId)]).subscribe(function (res) {
                                _this.rolesList = res[0];
                                _this.roleApplicationList = res[1];
                                _this.populateRoleApplicationList();
                            }, function (error) {
                                _this.alertService.error('Error in retrieving Application Roles' + error.status);
                            });
                        }
                    }
                    this.showRoles = true;
                };
                ApplicationRoles.prototype.populateRoleApplicationList = function () {
                    var _this = this;
                    this.associatedRolesList = [];
                    this.roleApplicationList.forEach(function (x) {
                        var tempRole = _this.rolesList.find(function (p) { return p.Id == x.RoleId; });
                        if (tempRole) {
                            _this.associatedRolesList.push({
                                RoleName: tempRole.Name,
                                RoleId: x.RoleId,
                                RoleApplicationId: x.Id
                            });
                        }
                    });
                    if (this.associatedRolesList.length) {
                        this.selectedRoleApplicationId = this.associatedRolesList[0].RoleApplicationId;
                        this.populateRelatedItems();
                    }
                };
                ApplicationRoles.prototype.roleApplicationChanged = function (roleApplicationId) {
                    this.selectedRoleApplicationId = roleApplicationId;
                    this.populateRelatedItems();
                };
                ApplicationRoles.prototype.populateRelatedItems = function () {
                    if (this.selectedRoleApplicationId > 0) {
                    }
                };
                ApplicationRoles = __decorate([
                    core_1.Component({
                        selector: 'applicationsRoles',
                        templateUrl: '../../../../..//Datahub/routes/admin/auth/applicationRoles/applicationRoles.html'
                    }), 
                    __metadata('design:paramtypes', [adminAuthApiService_1.AdminAuthApiService, apiService_1.ApiService, alertService_1.AlertService])
                ], ApplicationRoles);
                return ApplicationRoles;
            }());
            exports_1("ApplicationRoles", ApplicationRoles);
        }
    }
});
//# sourceMappingURL=applicationRoles.js.map