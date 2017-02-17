import {Injectable, OnDestroy} from '@angular/core';
import {SchematicApiService} from '../schematicService';
import {AlertService} from "../../../../../ReusableServices/alertService";
import {AppSettingsService} from "../../../../../ReusableServices/appSettingsService";
import {ExecutionDialogService} from '../Execution/executionDialogService';
import {Subscription}   from 'rxjs/Subscription';
@Injectable()
export class SchematicExecInfo implements OnDestroy {
    private schematicID: number;
    private isExecutePage: boolean;
    private lastStepNumber: number;

    public showAllStepConfig: boolean = false;                              //toggle to show all config for each step
    public showAllStepMessage: boolean = true;                              //toggle to show execution message for each step
    public toggleListMessage:boolean = true;
    public schematicState: string = "";                                    //state of this schematic
    public allStepsVM: Array<Step>;                                         //steps data for this page
    public userRunTimeValues: UserRunTimeValues = new UserRunTimeValues();  //user runtime overwrite values    
    public allSchematicConfiguration: Array<any>;                           //raw schematic config data returned from api   
    public allConfigValueTypes: Array<any>;                                 //for JSON plugin

    public subcriptConfigToggle: Subscription;
    public messageToggle: Subscription;

    constructor(private processApi: SchematicApiService, private appSetttingService: AppSettingsService, private alert: AlertService, private channelService: ExecutionDialogService) {
        let self = this;
        self.subcriptConfigToggle = self.channelService.configToggle$.subscribe(answer => {
            self.stepConfigToggleAll(answer);
        })
        self.messageToggle = self.channelService.messageToggle$.subscribe(answer => {
            self.stepResultToggleAll(answer);
        })
        
    }

    
    ngOnDestroy(){
        var self = this;
        self.subcriptConfigToggle.unsubscribe();
        self.messageToggle.unsubscribe();
    }
    
    
    public getSchematicConfiguration(schematicID: number, isExecutePage: boolean) {
        this.reset();
        this.schematicID = schematicID;
        this.isExecutePage = isExecutePage;
        if (this.schematicID > 0) {
            this.processApi.fetchMultipleForSchematicConfiguration(this.schematicID).subscribe(
                res => {
                    this.buildSchematicConfig(res[0]);
                    this.allConfigValueTypes = res[1];
                }
                , error => {
                    this.alert.error(this.appSetttingService.appNotificationsMsg.apiMsg.apiGetSchematicDetails + error.status);
                },
                () => { }
            );
        }
    }
        // if you have Id that means execution is inside of pipeline
    public receiveMsg(data: any, Id?: number) {
        
        let self = this;
        // do a little job and make string JSON ready
        let dataJSonReady = data.replace(/\\/g,"\\\\").replace(/\r?\n|\r/g,"").replace(/\t/g, '');
        try {
            var jsonData = JSON.parse(dataJSonReady);
            if (jsonData.schematicId == this.schematicID + '' || jsonData.schematicId === "0") {

                let step: Step = self.allStepsVM.find(x => x.StepNumber.toString() === jsonData.stepId);
                if (step != null) {

                    self.updateStepState(jsonData.stepId, jsonData.logLevel, jsonData.message);

                    let msgResult: Array<any> = new Array<any>();
                    if (step.ExecutionMessage.length > 0) {
                        msgResult = step.ExecutionMessage
                    }
                    // bellow line is coverting ticksfrom C# to Date available for JavaScript
                    let mcString = Number(jsonData.timeStamp.slice(0, jsonData.timeStamp.indexOf('.')));
                    let epochMicrotimeDiff = 621355824000000000;
                    let theDate = new Date((mcString - epochMicrotimeDiff) / 10000);

                    msgResult.push({
                        'schematicId': jsonData.schematicId,
                        'stepId': jsonData.stepId,
                        'timestamp': jsonData.timeStamp,
                        'message': jsonData.message,
                        'class': jsonData.logLevel,
                        'date': theDate
                    });
                    msgResult.sort(sortByTimestamp);
                    step.ExecutionMessage = msgResult;
                    self.channelService.sendExecutionMessage$.emit(msgResult);
                    if (jsonData.message.toUpperCase().indexOf('CONTINUE FALSE') > -1) {
                        self.channelService.sendExecutionMessage$.emit({ 'lastMsg': 'Finished - but incomplete !!!!' });
                    }
                    /*
                     if (msg.toUpperCase().indexOf('COMPLETE') > -1 ){
                     self.channelService.sendExecutionMessage$.emit({'lastMsg': 'Finished !'});
                     }
                     */

                }
                else {
                    if (jsonData.stepId === "0" && jsonData.message.startsWith("Pipeline") && jsonData.message.indexOf('finished with state') > -1) {
                        self.schematicState = jsonData.message;
                        self.channelService.sendExecutionMessage$.emit({ 'lastMsg': jsonData.messge });
                        return;
                    }
                    if (jsonData.stepId === "0" && jsonData.message.startsWith("Schematic") && jsonData.message.indexOf('finished with state') > -1 && typeof Id == 'undefined') {
                        self.schematicState = jsonData.message;
                        self.channelService.sendExecutionMessage$.emit({ 'lastMsg': jsonData.messge });
                        return;
                    }

                    if (jsonData.stepId === "0" && jsonData.message.startsWith('Cannot continue to process Pipeline')) {
                        self.schematicState = jsonData.message;
                        self.channelService.sendExecutionMessage$.emit({ 'lastMsg': 'Pipeline finished!' + jsonData.messge });
                        return;
                    }
                }
            }
        } catch ( Exception){
            console.log( 'Error when processing SignalR messages:' + "| message is :" + data);
        //    self.alert.error('Error when processing SignalR messages. It is not in expected format!!' + data);
            return;
        }



    }

    public getStepState(stepNumber: number) {
        if (this.isExecutePage) {
            return this.allStepsVM.find(x => x.StepNumber == stepNumber).StepStateDisplay;
        }
        else {
            return "";
        }
    }

    public getUserRunTimeValues() {
        var userRunTimeValues: UserRunTimeValues = new UserRunTimeValues();

        //populate BusinessDate
        userRunTimeValues.BusinessDate = this.userRunTimeValues.BusinessDate;

        //populate overwritten config values, if any
        this.allStepsVM.forEach(function (x) {
            x.StepAssets.forEach(function (item) {
                if (item.RuntimeConfigurationValue != "") {
                    userRunTimeValues.ConfigValues.push(new ConfigValue(item.ConfigvalueId, item.RuntimeConfigurationValue));
                }
            });
        });           

        //populate steps to skip, if any
        this.allStepsVM.forEach(function (x) {
            if (!x.Active)
                userRunTimeValues.StepsToSkip.push(x.StepNumber);
        });

        //populate runtime values, if any
        if (this.userRunTimeValues.RuntimeValues.length > 0)
            userRunTimeValues.RuntimeValues = this.userRunTimeValues.RuntimeValues;

        var jsonString = JSON.stringify(userRunTimeValues);
        console.debug("userRunTimeValues: " + jsonString);

        return jsonString;
    }

    public addRuntimeValue(runtimeMask: string, runtimeValue: string) {
        if (runtimeMask.trim() != "" && !this.userRunTimeValues.RuntimeValues.find(x => x.Key == runtimeMask))
            this.userRunTimeValues.RuntimeValues.push(new Runtimevalue(runtimeMask, runtimeValue));
    }

    public removeRuntimeValue(runtimeMask: string) {
        this.userRunTimeValues.RuntimeValues.forEach(function (item, index, object) {
            if (item.Key == runtimeMask) {
                object.splice(index, 1);
            }
        });
    }

    public stepConfigToggle(stepNumber: number) {
        var match = this.allStepsVM.find(function (x) { return x.StepNumber === stepNumber });
        if (match) {
            match.StepConfigVisibility = !match.StepConfigVisibility;
        }
    }

    public stepMessageToggle(stepNumber: number) {
        var match = this.allStepsVM.find(function (x) { return x.StepNumber === stepNumber });
        if (match) {
            match.StepMessageVisibility = !match.StepMessageVisibility;
        }
    }

    public stepConfigToggleAll(show: boolean) {
        this.allStepsVM.forEach(function (x) {
            x.StepConfigVisibility = show;
        });
    }

    public stepResultToggleAll(show: boolean) {
        this.toggleListMessage = ! this.toggleListMessage;
        this.allStepsVM.forEach(function (x) {
            x.StepMessageVisibility = show;
        });
    }

    public resetSteps() {
        this.allStepsVM.forEach(function (x) {
            x.Reset();
        });
        this.schematicState = "";
    }

    private reset() {
        this.schematicID = 0;
        this.isExecutePage = false;
        this.lastStepNumber = 0;
        this.showAllStepConfig = false;
        this.showAllStepMessage = true;
        this.toggleListMessage = true;
        this.schematicState = "";
        this.allStepsVM = [];
        this.userRunTimeValues = new UserRunTimeValues();
        this.allSchematicConfiguration = [];
        this.allConfigValueTypes = [];
    }

    private buildSchematicConfig(res) {
        if (res.length > 0) {
            this.allSchematicConfiguration = res.sort(function (a, b) {
                return a.StepNumber - b.StepNumber;
            });
            var reverseList = res.sort(function (a, b) {
                return b.StepNumber - a.StepNumber;
            });
            if (reverseList) {
                this.lastStepNumber = reverseList[0].StepNumber;
            }
            this.buildSchematicSteps();
        }
    }

    private buildSchematicSteps() {
        var sequence = 0;
        var self = this;
        self.allStepsVM = new Array<Step>();
        var maxStepNo: number = 1;
        while (maxStepNo <= this.lastStepNumber) {
            var assets = this.allSchematicConfiguration.filter(x=> { return x.StepNumber === maxStepNo });
            var stepConfigs: Array<StepConfig> = new Array<StepConfig>();

            assets.forEach(function (x) {
                var configValue = x.ConfigurationValue.trim();
                var editByComponent = false;
                var componentType = 'JsonLike';
                try{
                    if(!x.Template || x.Template.length == 0){
                         editByComponent = false;
                    }else {
                        let type = JSON.parse(x.Template)['#Type#'];
                        if (type) {
                            editByComponent = true;
                            if (type.toUpperCase()  == 'ARRAYLIKE'){
                                componentType = type.toUpperCase() ;
                            }else{
                                componentType = 'JsonLike';
                            }
                        }else{
                            editByComponent = false;
                        }
                    }

                }catch( err) {
                    console.log('Invalid JSON template with no type defined!');
                    self.alert.error("Invalid Template : ConfigValueTypeId:" + err.message);
                    editByComponent = false;
                }

                let stepConfig = new StepConfig(x.ConfigValueId, configValue, configValue, x.ConfigValueTypeLookupKey, x.ConfigValueTypeId, x.Template, editByComponent, !editByComponent);
                stepConfig.componentType = componentType;
                stepConfigs.push(stepConfig);
                //TODO: we can use the comment out line when api call is modified
                //stepConfigs.push(new StepConfig(x.ConfigValueId, configValue, "", x.ConfigValueTypeLookupKey, x.ConfigValueTypeId));
            });
            var step: Step = new Step(maxStepNo, assets[0].UnitLookupKey, stepConfigs);
            self.allStepsVM.push(step);
            maxStepNo++;
        }
    }

    private updateStepState(stepNumber: string, logLevel: string, msg: string) {
        var step = this.allStepsVM.find(x => x.StepNumber.toString() == stepNumber)
        if (step != null) {
            var state = step.StepState;
            if (state == "") {
                step.StepStateDisplay = "<label><strong>Running</strong></label>";
                step.StepState = "Running";
            }
            if (logLevel == "Error" || msg.endsWith("continue False")) {
                step.StepStateDisplay = "<label class='text-danger'><strong>Error</strong></label>";
                step.StepState = "Error";

            } else if (logLevel == "Fatal" || msg.endsWith("continue False")) {
                step.StepStateDisplay = "<label class='text-danger'><strong>Fatal</strong></label>";
                step.StepState = "Fatal";
            }
            else if (logLevel == "Warn" && state != "Error") {
                step.StepStateDisplay = "<label class='text-warning'><strong>Warn</strong></label>";
                step.StepState = "Warn";
            }
            else if (msg.endsWith("continue True") && (state == "" || state == "Running")) {
                step.StepStateDisplay = "<label class='text-success'><strong>Succeeded</strong></label>";
                step.StepState = "Succeeded";
            }
        }

        if (this.allStepsVM.find(x => x.StepState == "Running"))
            this.schematicState = "Running";
    }
}

export class UserRunTimeValues {
    constructor() {
        this.BusinessDate = new Date();//.toLocaleDateString();
        this.StepsToSkip = [];
        this.RuntimeValues = [];
        this.ConfigValues = [];
    }

    public BusinessDate: Date;
    public ConfigValues: Array<ConfigValue>;
    public RuntimeValues: Array<Runtimevalue>;
    public StepsToSkip: Array<number>;
}

export class ConfigValue {
    constructor(
        public ConfigID: number,
        public ConfigValue: any
    ) { }
}

export class Runtimevalue {
    constructor(
        public Key: string,
        public Value: string
    ) { }
}

export class Step {
    constructor(
        public StepNumber: number,
        public UnitName: string,
        public StepAssets: Array<StepConfig>,
        public ExecutionMessage: Array<any> = [],
        public StepStateDisplay: string = "",
        public StepState: string = "",
        public StepMessageVisibility: boolean = true,
        public StepConfigVisibility: boolean = false,
        public Active: boolean = true) {
    }

    Reset() {
        this.ExecutionMessage = [];
        this.StepStateDisplay = "";
        this.StepState = "";
    }
}

export class StepConfig {
    public componentType : string = 'JsonLike';
    constructor(
        public ConfigvalueId: number,
        public ConfigurationValue: string,
        public RuntimeConfigurationValue: string,
        public ConfigValueTypeLookupKey: string,
        public ConfigValueTypeId: number,
        public Template: string = "",
        public editByComponent: boolean = false,
        public isVisible:boolean = true) {
    }
}
export function sortByTimestamp (n1, n2) {
        if (n1.timestamp > n2.timestamp) {
            return 1;
        }
        if (n1.timestamp < n2.timestamp) {
            return -1;
        }
        return 0;
    }