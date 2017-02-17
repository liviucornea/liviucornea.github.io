import {AlertService} from "../../../../../ReusableServices/alertService";
import {Injectable, EventEmitter} from '@angular/core';

// file contains code to facilitate communication between pipelines and schematics on execution page
// it is used when pipeline is calling for execution and to send to parent the messages for each schematic
@Injectable()
export class ExecutionDialogService {
    // this is sending a message from  a schematic to parent page

    public sendExecutionMessage$:EventEmitter<any>;
    public schematicRuntimeValue$: EventEmitter<any>;
    public askForSchematicsRuntimeValue$ : EventEmitter<any>;
    public configToggle$ : EventEmitter<any>;
    public messageToggle$ : EventEmitter<any>;

    constructor (private alertService: AlertService){
        this.sendExecutionMessage$ = new EventEmitter();
        this.schematicRuntimeValue$ = new EventEmitter();
        this.askForSchematicsRuntimeValue$ = new EventEmitter();
        this.configToggle$ = new EventEmitter();
        this.messageToggle$ = new EventEmitter();
    }

}