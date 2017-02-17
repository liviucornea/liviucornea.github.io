import {Component, ElementRef, OnInit, OnDestroy,  Input} from '@angular/core';
import {AlertService} from "../../../../../ReusableServices/alertService";
import {signalr, connectionMsg} from '../../../../services/signalr';
import {AppSettingsService} from "../../../../../ReusableServices/appSettingsService";
import {SchematicExecInfo} from "./SchematicExecInfo";
import {ExecutionDialogService} from "../Execution/executionDialogService";
import {Subscription}   from 'rxjs/Subscription';

@Component({
    template: require('./schematicpreview.html'),
    styles: [require('./schematicpreview.scss')],
    selector: 'schematicPreview',
    providers: [SchematicExecInfo]
})

export class SchematicPreview implements OnInit, OnDestroy {
    @Input("schematicId") schematicId:number ;
    @Input("Id") Id:number ;
    connectionStatus: string = "connecting to server";
    isExecutePage: boolean = false;
    isInputPageTypeExecute: boolean = false;
    showMsg: boolean = false;
    runtimeMask: string = "";
    runtimeValue: string = "";
    elemRef: ElementRef;
    appSettingService: AppSettingsService;
    schematic: SchematicExecInfo;
    isSpinnerRunning:boolean = false;
    executeStatus:boolean = true;
    subcriptRuntimeValues: Subscription;
    messagesSubscription: Subscription;

    constructor(private schematicExecInfo: SchematicExecInfo, private appSetting: AppSettingsService, private alert: AlertService
        , private signalr: signalr, private elementRef: ElementRef, private channelService :ExecutionDialogService) {
        this.schematic = schematicExecInfo;
        this.appSettingService = appSetting;
        this.elemRef = elementRef;
    }
    ngOnDestroy(){
        var self = this;
        self.signalr = null;
        self.subcriptRuntimeValues.unsubscribe();
        self.messagesSubscription.unsubscribe();
     }
    ngOnInit(){
        var self = this;
        self.subscribeForMessages();
        self.populateWithSchematicDetails(this.schematicId, true);
        self.subcriptRuntimeValues = self.channelService.askForSchematicsRuntimeValue$.subscribe(answer => {
            if (answer) {
                this.executeSchematicClicked();
            }
        })
    }

    subscribeForMessages() {
        let self = this;
        self.messagesSubscription = self.signalr.msgReceived.subscribe(data => {
          //  self.showMessage(data);
            self.schematic.receiveMsg(data, self.Id);
            if (data.indexOf("Complete") > -1){ this.isSpinnerRunning = false; this.schematic.schematicState = "Finished";}
        }, error => {
            self.alert.error(self.appSettingService.appNotificationsMsg.apiMsg.apiGetSchematicDetails + error.status);
            self.connectionStatus = error.status;
            self.executeStatus = false;
            self.isSpinnerRunning = false;
        });
    }

    populateWithSchematicDetails(schematicId: number, isExecutionPage: boolean = false) {
        this.reset();
        if (schematicId > 0) {
            this.isInputPageTypeExecute = isExecutionPage;
            this.schematicId = schematicId;
            this.isExecutePage = isExecutionPage;
            this.schematic.getSchematicConfiguration(schematicId, isExecutionPage);
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
        }
        else {
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
/*
    showMessage(data: any) {
        this.schematic.receiveMsg(data);
    }
*/
    executeSchematicClicked() {
        let self = this;
        if (this.schematicId) {
            this.isSpinnerRunning = true;
            //clear previous result
            this.schematic.resetSteps();
            this.showMsg = true;
            //execute
            //this.signalr.executeSchematic(String(this.schematicId), this.schematic.getUserRunTimeValues());
            this.channelService.schematicRuntimeValue$.emit({'runtimeValue':this.schematic.getUserRunTimeValues(), 'id': self.Id ?  self.Id : '' });
            
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

    getJson(eventData:any,asset:any, step:any){
        var self = this;
        asset.RuntimeConfigurationValue = eventData.value;
        try {
            let targetAsset = step.StepAssets.find((x) => {
                if (x.editByComponent && x.componentType == 'ARRAYLIKE') {
                    return true;
                }
                ;
                return false
            })
            if (targetAsset && asset.componentType.toUpperCase() == "JSONLIKE") {
                let jsonFromEvent = JSON.parse(eventData.value);
                let targetConfigValue = JSON.parse(targetAsset.ConfigurationValue);
                let settedSections = [];
                let existingSections = [];
                jsonFromEvent.forEach((x)=> {
                    settedSections.push('DocPart' + ' - ' + x.DocPart);
                });
                targetConfigValue.forEach((x)=> {
                    existingSections.push('DocPart' + ' - ' + x[0].DocPart);
                });

                existingSections.forEach((x)=> {
                    if (settedSections.indexOf(x) == -1) {
                        targetAsset.isVisible = true;
                        self.alert.addAlertAndRequestAnswer('Do you want to delete section : ' + x + ' in Column Mapping?', null, 'Delete Section');
                        var subscription = self.alert.requestConfirmationAnswer$.subscribe(answer => {
                            subscription.unsubscribe();
                            if (answer != "OK") {
                                targetAsset.isVisible = false;
                                return;
                            }
                            setTimeout(() => {
                                this.alert.sendSectionForDelete$.emit(x);
                            }, 300);

                        });


                    }
                });

            }
        }catch(Exception){
            console.log("Unable to delete corresponding section from Column mapping");
        }




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

