"use strict";
var core_1 = require("@angular/core");
var alertService_1 = require("./alertService");
var appSettingsService_1 = require("./appSettingsService");
var ruleService_1 = require("./ruleService");
var matrixService_1 = require("./matrixService");
var crudService = (function () {
    function crudService(alertService, appSettingsSrv, ruleService, matrixService) {
        this.alertService = alertService;
        this.appSettingsSrv = appSettingsSrv;
        this.ruleService = ruleService;
        this.matrixService = matrixService;
        this.OnCrudOperationSuccess = new core_1.EventEmitter();
        this.alert = alertService;
        this.appSettingsService = appSettingsSrv;
    }
    crudService.prototype.setCallerContext = function (ctx) {
        this.callerContext = ctx;
    };
    crudService.prototype.getCallerContext = function () {
        return this.callerContext;
    };
    crudService.prototype.updateInlineRecord = function (columns, gridSettings, pageName, httpProxy) {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(gridSettings);
        var pluginValue = this.matrixService.buildJSONObject(columns, primaryColumnName);
        if (this.ruleService.validateRulesByRulesConfig(pluginValue, gridSettings["RulesConfig"], columns)) {
            this.UpdatePage(pluginValue, pageName, gridSettings, httpProxy);
        }
    };
    crudService.prototype.updateInsertFormRecord = function (columns, gridSettings, pageName, pageType, httpProxy) {
        for (var colInd in columns) {
            var column = columns[colInd];
            var type = gridSettings.ColumnConfiguration.find(function (x) { return x.dbColumnName == column.name; });
            if (type.dataSourceAddress !== undefined) {
                var lookupColumnName = type.dataSourceAddress.displayColumnName;
                var lookupRow = type.dataSource.find(function (row) {
                    if (row[lookupColumnName] === column.val) {
                        return row;
                    }
                });
                if (lookupRow !== undefined) {
                    column.val = lookupRow[type.dataSourceAddress.dbColumnName];
                }
            }
        }
        var primaryColumnName = this.matrixService.getPrimaryColumnName(gridSettings);
        var pluginValue = this.matrixService.buildJSONObject(columns, primaryColumnName);
        switch (pageType.toLowerCase()) {
            case "edit":
                this.UpdatePage(pluginValue, pageName, gridSettings, httpProxy);
                break;
            case "add":
                this.InsertPage(pluginValue, pageName, httpProxy);
                break;
            default:
                this.OnCrudOperationSuccess.emit("Cancel");
        }
    };
    crudService.prototype.delete = function (columns, pageName, primaryColumnName, httpProxy) {
        var _this = this;
        var data = this.matrixService.buildJSONObject(columns, primaryColumnName);
        if (httpProxy) {
            httpProxy.ExecuteDelete(data, pageName)
                .subscribe(function (res) {
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.deletionConfirmationMsg);
                _this.OnCrudOperationSuccess.emit("DeleteSuccess");
            }, function (error) {
                _this.alert.error(_this.appSettingsService.appNotificationsMsg.apiMsg.apiDelete + error.status);
            }, function () {
            });
        }
    };
    /*buildJSONObject(columns,primaryColumnName) {
        var data = columns;
        var jsonValue = '{ ';
        for (var i = 0; i < data.length; i++) {
            var dbName = data[i].name;
            var editedValue = JSON.stringify(data[i].val);
            if(primaryColumnName == dbName && (data[i].val == "" || data[i].val == undefined ))
            {
                editedValue = JSON.stringify(0);
            }
            (i + 1) == data.length ? jsonValue += "\"" + dbName + "\" : " + editedValue : jsonValue += "\"" + dbName + "\" : " + editedValue + ",";
        }
        jsonValue += ' }';

        var returndata = JSON.parse(jsonValue);
        console.log(returndata);
        return returndata;
    }*/
    crudService.prototype.UpdatePage = function (returndata, pageName, gridSettings, httpProxy) {
        var _this = this;
        var PrimaryKeyColumn = undefined;
        if (httpProxy) {
            if (gridSettings["PrimaryKeyColumn"]) {
                PrimaryKeyColumn = gridSettings["PrimaryKeyColumn"];
            }
            httpProxy.ExecuteUpdate(returndata, pageName, PrimaryKeyColumn)
                .subscribe(function (res) {
                //alert("Record updated successfully");
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                _this.OnCrudOperationSuccess.emit("UpdateSucceeded");
            }, function (error) {
                _this.alert.error("async error #" + error.status);
            }, function () {
            });
        }
    };
    crudService.prototype.InsertPage = function (data, pageName, httpProxy) {
        var _this = this;
        if (httpProxy) {
            httpProxy.ExecuteInsert(data, pageName)
                .subscribe(function (res) {
                //  alert("Record inserted successfully");
                _this.alert.addAlert(_this.appSettingsService.appNotificationsMsg.insertMSG);
                _this.OnCrudOperationSuccess.emit("InsertSucceeded");
            }, function (error) {
                _this.alert.error("async error #" + error.status);
            }, function () { });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], crudService.prototype, "OnCrudOperationSuccess", void 0);
    crudService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [alertService_1.AlertService, appSettingsService_1.AppSettingsService, ruleService_1.RuleService, matrixService_1.matrixService])
    ], crudService);
    return crudService;
}());
exports.crudService = crudService;
//# sourceMappingURL=crudService.js.map