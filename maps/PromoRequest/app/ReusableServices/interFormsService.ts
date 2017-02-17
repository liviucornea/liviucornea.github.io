import {Injectable, EventEmitter} from "angular2/core";
import {matrixService} from "./matrixService";

@Injectable()
export class InterFormsService {

    inputControl:any;

    public columnInserted: EventEmitter<any>;

    public pageInserted: EventEmitter<any>;

    constructor() {
        this.columnInserted = new EventEmitter<any>();
        this.pageInserted = new EventEmitter<any>();
    }


    public assignControl(control){
        this.inputControl=control;
    }

    public saveValueInControl(val){
        this.inputControl.val=val;
    }
}
