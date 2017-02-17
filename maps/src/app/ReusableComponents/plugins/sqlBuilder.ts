import {iPluginControl} from "./iPluginControl";
import {Component} from "@angular/core";
/**
 * Created by noutaa2 on 4/7/2016.
 */

@Component({
    selector: 'sqlBuilder',
    template: "",
    //TODO:RF
    //directives: [],
})
export class sqlBuilder implements iPluginControl{

    processEndProcess:any;

    activate(){

    }

    returnResult(){
        return "";
    }
    completedCallBack(callBack){
        this.processEndProcess=callBack;
    }

    constructor(){
    }
}

