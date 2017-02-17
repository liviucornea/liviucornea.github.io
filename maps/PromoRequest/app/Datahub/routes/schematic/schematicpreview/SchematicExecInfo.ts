import {Component, Injector, Injectable} from 'angular2/core';
import {SchematicApiService} from '../schematicService';
import {AlertService} from "../../../../ReusableServices/alertService";
import {AppSettingsService} from "../../../../ReusableServices/appSettingsService";

@Injectable()
export class SchematicExecInfo {
    constructor(private processApi: SchematicApiService, private appSetttingService: AppSettingsService, private alert: AlertService) {
    }

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

    public receiveMsg(data: any) {
        var messages = data.split("|");
        var logLevel = messages[0];
        var timeStampValue = messages[1];
        var schematicID = messages[2];
        var stepID = messages[3];
        var msg = messages[4];

        var step: Step = this.allStepsVM.find(x=> x.StepNumber.toString() === stepID);
        if (step != null) {

            this.updateStepState(stepID, logLevel, msg);

            var msgResult: Array<any> = new Array<any>();
            if (step.ExecutionMessage.length > 0) {
                msgResult = step.ExecutionMessage
            }
            // bellow line is coverting ticksfrom C# to Date available for JavaScript
            var mcString = Number(timeStampValue.slice(0,timeStampValue.indexOf('.')));
            var epochMicrotimeDiff = 621355824000000000;
            var theDate = new Date((mcString - epochMicrotimeDiff)/10000) ;
            msgResult.push({
                'stepId': stepID,
                'timestamp': timeStampValue,
                'message': msg,
                'class': logLevel,
                'date': theDate
            });

            msgResult.sort((n1, n2) => {
                if (n1.timestamp > n2.timestamp) {
                    return 1;
                }
                if (n1.timestamp < n2.timestamp) {
                    return -1;
                }
                return 0;
            });
            step.ExecutionMessage = msgResult;
        }
        else if (stepID === "0" && msg.startsWith("Schematic Completed with state ")) {
            this.schematicState = msg;
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

        this.allStepsVM = new Array<Step>();
        var maxStepNo: number = 1;
        while (maxStepNo <= this.lastStepNumber) {
            var assets = this.allSchematicConfiguration.filter(x=> { return x.StepNumber === maxStepNo });
            var stepConfigs: Array<StepConfig> = new Array<StepConfig>();

            assets.forEach(function (x) {
                var configValue = x.ConfigurationValue.trim();
                var isJson = configValue.startsWith("{") || configValue.startsWith("[");
                //TODO: we can use the comment out line when api call is modified
                stepConfigs.push(new StepConfig(x.ConfigValueId, configValue, configValue, x.ConfigValueTypeLookupKey, x.ConfigValueTypeId, x.Template, isJson, isJson ? false:true));
                //stepConfigs.push(new StepConfig(x.ConfigValueId, configValue, "", x.ConfigValueTypeLookupKey, x.ConfigValueTypeId));
            });

            var step: Step = new Step(maxStepNo, assets[0].UnitLookupKey, stepConfigs);

            this.allStepsVM.push(step);

            maxStepNo++;
        }
    }

    private updateStepState(stepNumber: string, logLevel: string, msg: string) {
        var step = this.allStepsVM.find(x => x.StepNumber.toString() == stepNumber)
        if (step != null) {
            var state = step.StepState;

            if (state == "") {
                step.StepStateDisplay = "<label style='font:bold;'>Running</label>";
                step.StepState = "Running";
            }

            if (logLevel == "Error" || msg.endsWith("continue False")) {
                step.StepStateDisplay = "<label style='color:red; font:bold;'>Error</label>";
                step.StepState = "Error";

            } else if (logLevel == "Fatal" || msg.endsWith("continue False")) {
                step.StepStateDisplay = "<label style='color:red; font:bold;'>Fatal</label>";
                step.StepState = "Fatal";
            }

            else if (logLevel == "Warn" && state != "Error") {
                step.StepStateDisplay = "<label style='color:Orange; font:bold;'>Warn</label>";
                step.StepState = "Warn";
            }
            else if (msg.endsWith("continue True") && (state == "" || state == "Running")) {
                step.StepStateDisplay = "<label style='color:green; font:bold;'>Succeeded</label>";
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
    constructor(
        public ConfigvalueId: number,
        public ConfigurationValue: string,
        public RuntimeConfigurationValue: string,
        public ConfigValueTypeLookupKey: string,
        public ConfigValueTypeId: number,
        public Template: string = "",
        public isJSON: boolean = false,
        public isVisible:boolean = true) {
    }
}