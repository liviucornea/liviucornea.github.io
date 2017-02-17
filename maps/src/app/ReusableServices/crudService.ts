import {Injectable, Output, EventEmitter} from "@angular/core";
import {AlertService} from "./alertService";
import {ApiService} from "./apiService";
import {AppSettingsService} from "./appSettingsService";
import {RuleService} from "./ruleService";
import {matrixService} from "./matrixService";

@Injectable()
export class crudService {

    alert:AlertService;
    appSettingsService:any;
    @Output() OnCrudOperationSuccess = new EventEmitter();
    callerContext:any;

    constructor(private alertService:AlertService,private appSettingsSrv: AppSettingsService,
                private ruleService: RuleService, private matrixService: matrixService) {
        this.alert=alertService;
        this.appSettingsService=appSettingsSrv;
    }

    setCallerContext(ctx){
        this.callerContext=ctx;
    }

    getCallerContext(){
        return this.callerContext;
    }

    updateInlineRecord(columns:any, gridSettings:any, pageName:any, httpProxy:any) {

        var primaryColumnName = this.matrixService.getPrimaryColumnName(gridSettings);
        var pluginValue = this.matrixService.buildJSONObject(columns, primaryColumnName);

        if(this.ruleService.validateRulesByRulesConfig(pluginValue,gridSettings["RulesConfig"],columns)) {
            this.UpdatePage(pluginValue, pageName, gridSettings, httpProxy);
        }
    }

    updateInsertFormRecord(columns:any, gridSettings:any, pageName:any, pageType:any, httpProxy:any){
        for (var colInd in columns) {
            var column = columns[colInd];
            var type = gridSettings.ColumnConfiguration.find(x=>x.dbColumnName == column.name);
            if (type.dataSourceAddress !== undefined) {
                var lookupColumnName = type.dataSourceAddress.displayColumnName;
                var lookupRow = type.dataSource.find(function (row) {
                    if (row[lookupColumnName] === column.val) {
                        return row;
                    }
                });
                if(lookupRow !== undefined) {
                    column.val = lookupRow[type.dataSourceAddress.dbColumnName];
                }
            }
        }
        var primaryColumnName = this.matrixService.getPrimaryColumnName(gridSettings);
        var pluginValue = this.matrixService.buildJSONObject(columns, primaryColumnName);

        switch (pageType.toLowerCase()) {
            case "edit":
                this.UpdatePage(pluginValue, pageName, gridSettings,httpProxy);
                break;
            case "add":
                this.InsertPage(pluginValue, pageName, httpProxy);
                break;
            default:
                this.OnCrudOperationSuccess.emit("Cancel");
        }
    }

    delete(columns:any, pageName, primaryColumnName:any, httpProxy:any){
        var data=this.matrixService.buildJSONObject(columns,primaryColumnName )
       if (httpProxy) {
            httpProxy.ExecuteDelete(data, pageName)
                .subscribe(
                    res => {

                        this.alert.addAlert(this.appSettingsService.appNotificationsMsg.deletionConfirmationMsg);
                        this.OnCrudOperationSuccess.emit("DeleteSuccess");
                    },
                    error => {
                        this.alert.error(this.appSettingsService.appNotificationsMsg.apiMsg.apiDelete + error.status);
                    },
                    () => {
                    }
                );
        }
    }

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
    private UpdatePage(returndata, pageName,  gridSettings, httpProxy) {
        let PrimaryKeyColumn = undefined;
        if (httpProxy) {
            if (gridSettings["PrimaryKeyColumn"]) {
                PrimaryKeyColumn = gridSettings["PrimaryKeyColumn"];
            }
            httpProxy.ExecuteUpdate(returndata, pageName, PrimaryKeyColumn)
                .subscribe(
                    res => {
                        //alert("Record updated successfully");
                        this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                        this.OnCrudOperationSuccess.emit("UpdateSucceeded");
                    },
                    error => {
                        this.alert.error("async error #" + error.status);
                    },
                    () => {
                    }
                );
        }
    }
    private InsertPage(data, pageName, httpProxy ) {
        if (httpProxy) {
            httpProxy.ExecuteInsert(data, pageName)
                .subscribe(
                    res => {
                        //  alert("Record inserted successfully");
                        this.alert.addAlert( this.appSettingsService.appNotificationsMsg.insertMSG);
                        this.OnCrudOperationSuccess.emit("InsertSucceeded");
                    },
                    error => {
                        this.alert.error("async error #" + error.status);
                    },
                    () => { }
                );
        }
    }
}
