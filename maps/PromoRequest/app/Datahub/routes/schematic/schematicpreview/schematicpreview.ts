import {Component, ElementRef, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, NgClass} from "angular2/common";
import {AlertService} from "../../../../ReusableServices/alertService";
import {signalr, connectionMsg} from '../../../services/signalr';
import {AppSettingsService} from "../../../../ReusableServices/appSettingsService";
import {highlightlast} from '../../../../ReusableDirectives/highlightLast/highlightlast';
import {JsonEdit} from "../../../widgets/jsonEdit/json.edit.component";
import {SchematicExecInfo} from "./SchematicExecInfo";
import {SpinnerComponent} from "../../../../ReusableComponents/spinner/spinner.component";
import {RouteParams} from 'angular2/router';

@Component({
    templateUrl: "app/Datahub/routes/schematic/schematicpreview/schematicpreview.html",
    /*styleUrls: ['resources/Datahub/assets/default.css','resources/Datahub/routes/schematic/schematicpreview/schematicpreview.css'],*/
    styles: [`.Warn{color: orange;}    .Error{color: red;}`],
    selector: 'schematicPreview',
    directives: [FORM_DIRECTIVES, NgClass, highlightlast, JsonEdit, SpinnerComponent],
    providers: [SchematicExecInfo]
})

export class SchematicPreview implements OnInit {
    connectionStatus: string = "connecting to server";
    isExecutePage: boolean = false;
    isInputPageTypeExecute: boolean = false;
    schematicId: number;
    showMsg: boolean = false;
    //schematicResult: string = "";
    runtimeMask: string = "";
    runtimeValue: string = "";
    elemRef: ElementRef;
    appSettingService: AppSettingsService;
    schematic: SchematicExecInfo;
    isSpinnerRunning:boolean = false;
    schematicID:string;
    executeStatus:boolean = true;

    constructor(private schematicExecInfo1: SchematicExecInfo, private appSetting: AppSettingsService, private alert: AlertService, private signalr: signalr, private elementRef: ElementRef, private params: RouteParams) {
        this.schematic = schematicExecInfo1;
        this.appSettingService = appSetting;
        this.elemRef = elementRef;
        this.schematicID = params.get('id');

    }
    ngOnInit(){
        this.displayConnectionStatus();
    }
    displayConnectionStatus() {
        //if (this.isExecutePage)
        //{
        this.signalr.connectionEstablished.subscribe(data => {
            this.showConnectionStatus(data);
        });
        this.signalr.msgReceived.subscribe(data => {
            this.showMessage(data);
            if (data.indexOf("Complete") > -1){ this.isSpinnerRunning = false; this.schematic.schematicState ="Finished";}
        }, error => {
            this.alert.error(this.appSettingService.appNotificationsMsg.apiMsg.apiGetSchematicDetails + error.status);
            this.connectionStatus = error.status;
            this.executeStatus = false;
        });
        //}
    }

    showConnectionStatus(data: connectionMsg) {
        let msg;
        if (data.connectionID.length > 0 ) {
            msg = "Connection estabished, connection id " + data.connectionID
        } else {
            msg =  "Connection failed, " + data.message;
            this.executeStatus = false;
        }
        this.connectionStatus = msg;
    }

    populateWithSchematicDetails(schematicId: number, isExecutionPage: boolean = false) {
        this.reset();

        if (schematicId > 0) {
            this.isInputPageTypeExecute = isExecutionPage;
            this.schematicId = schematicId;
            this.isExecutePage = isExecutionPage;
            this.schematic.getSchematicConfiguration(schematicId, isExecutionPage);
            //this.setExecutePageChanges();

        }
    }

    reset() {
        this.showMsg = false;
        this.runtimeMask = "";
        this.runtimeValue = "";
    }

    setExecutePageChanges() {
        if (this.schematic.allStepsVM.length > 0) {
            this.isExecutePage = this.isInputPageTypeExecute;
            //this.connectionStatus = "connecting to server";
        }
        else {
            //this.connectionStatus = "";
            this.isExecutePage = false;
        }
    }

    createUserConfigurationValue(assets: Array<any>) {
        var userConfigurationValue: Array<any> = [];

        assets.forEach(function (x) {
            userConfigurationValue.push({ ConfigID: x.ConfigValueId, ConfigValue: "" });
        });

        return userConfigurationValue;
    }

    showMessage(data: any) {
        this.schematic.receiveMsg(data);
    }

    executeSchematicClicked() {
        // do nothing here as disabled attribut is not blocking click....
        // if (this.executeStatus === 'disabled') return;
        if (this.schematicId) {
            this.isSpinnerRunning = true;
            //clear previous result
            this.schematic.resetSteps();
            this.showMsg = true;
            //execute
            this.signalr.executeSchematic(String(this.schematicId), this.schematic.getUserRunTimeValues());
        }
    }

    getStepConfigName(configValueTypeLookupKey: string) {
        var pos = configValueTypeLookupKey.indexOf(":");
        if (pos > 0)
            return configValueTypeLookupKey.substring(pos + 1).trim();
        else
            return configValueTypeLookupKey;
    }

    getColumnWith() {
        if (this.isExecutePage)
            return "40%";
        else
            return "80%";
    }
    updateJsonValueToModel(asset, updatedValue) {
        asset.RuntimeConfigurationValue = updatedValue;
    }

    getJson(eventData:any,asset:any){
        asset.RuntimeConfigurationValue = eventData.value;
    }

    jsonCanceled(event,asset){
        if(event) asset.isVisible = false;
    }
    assetChanged(asset) {
        if (asset.ConfigurationValue !== asset.RuntimeConfigurationValue) {
            asset.isChanged = true;
        } else {
            asset.isChanged = false;
        }
    }
    checkIt(event, asset) {
        if (event.keyCode == 27 && asset.ConfigurationValue !== asset.RuntimeConfigurationValue) {
            asset.RuntimeConfigurationValue = asset.ConfigurationValue;
            asset.isChanged = false;
        }

    }


}

