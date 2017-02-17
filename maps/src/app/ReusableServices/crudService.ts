import { Injectable, Output, EventEmitter } from '@angular/core';
import { AlertService } from './alertService';
import { ApiService } from './apiService';
import { AppSettingsService } from './appSettingsService';
import { RuleService } from './ruleService';
import { matrixService } from './matrixService';

@Injectable()
export class crudService {

    alert: AlertService;
    appSettingsService: any;
    @Output() OnCrudOperationSuccess = new EventEmitter();
    callerContext: any;

    constructor(private alertService: AlertService, private appSettingsSrv: AppSettingsService,
        private ruleService: RuleService, private matrixService: matrixService) {
        this.alert = alertService;
        this.appSettingsService = appSettingsSrv;
    }

    setCallerContext(ctx) {
        this.callerContext = ctx;
    }

    getCallerContext() {
        return this.callerContext;
    }

    updateInlineRecord(columns: any, gridSettings: any, pageName: any, httpProxy: any) {

        let primaryColumnName = this.matrixService.getPrimaryColumnName(gridSettings);
        let pluginValue = this.matrixService.buildJSONObject(columns, primaryColumnName);

        if (this.ruleService.validateRulesByRulesConfig(pluginValue, gridSettings['RulesConfig'], columns)) {
            this.UpdatePage(pluginValue, pageName, gridSettings, httpProxy);
        }
    }

    updateInsertFormRecord(columns: any, gridSettings: any, pageName: any, pageType: any, httpProxy: any) {
        for (let colInd in columns) {
            let column = columns[colInd];
            let type = gridSettings.ColumnConfiguration.find(x => x.dbColumnName === column.name);
            if (type.dataSourceAddress !== undefined) {
                let lookupColumnName = type.dataSourceAddress.displayColumnName;
                let lookupRow = type.dataSource.find(function (row) {
                    if (row[lookupColumnName] === column.val) {
                        return row;
                    }
                });
                if (lookupRow !== undefined) {
                    column.val = lookupRow[type.dataSourceAddress.dbColumnName];
                }
            }
        }
        let primaryColumnName = this.matrixService.getPrimaryColumnName(gridSettings);
        let pluginValue = this.matrixService.buildJSONObject(columns, primaryColumnName);

        switch (pageType.toLowerCase()) {
            case 'edit':
                this.UpdatePage(pluginValue, pageName, gridSettings, httpProxy);
                break;
            case 'add':
                this.InsertPage(pluginValue, pageName, httpProxy);
                break;
            default:
                this.OnCrudOperationSuccess.emit('Cancel');
        }
    }

    delete(columns: any, pageName, primaryColumnName: any, httpProxy: any) {
        let data = this.matrixService.buildJSONObject(columns, primaryColumnName);
        if (httpProxy) {
            httpProxy.ExecuteDelete(data, pageName, primaryColumnName)
                .subscribe(
                res => {

                    this.alert.addAlert(this.appSettingsService.appNotificationsMsg.deletionConfirmationMsg);
                    this.OnCrudOperationSuccess.emit('DeleteSuccess');
                },
                error => {
                    this.alert.error(this.appSettingsService.appNotificationsMsg.apiMsg.apiDelete + error.status);
                },
                () => {
                }
                );
        }
    }

    private UpdatePage(returndata, pageName, gridSettings, httpProxy) {
        let PrimaryKeyColumn = undefined;
        if (httpProxy) {
            if (gridSettings['PrimaryKeyColumn']) {
                PrimaryKeyColumn = gridSettings['PrimaryKeyColumn'];
            }
            httpProxy.ExecuteUpdate(returndata, pageName, PrimaryKeyColumn)
                .subscribe(
                res => {
                    this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                    this.OnCrudOperationSuccess.emit('UpdateSucceeded');
                },
                error => {
                    this.alert.error('async error #' + error.status);
                },
                () => {
                }
                );
        }
    }
    private InsertPage(data, pageName, httpProxy) {
        if (httpProxy) {
            httpProxy.ExecuteInsert(data, pageName)
                .subscribe(
                res => {
                    this.alert.addAlert(this.appSettingsService.appNotificationsMsg.insertMSG);
                    this.OnCrudOperationSuccess.emit('InsertSucceeded');
                },
                error => {
                    this.alert.error('async error #' + error.status);
                },
                () => { }
                );
        }
    }
}
