//import {FORM_DIRECTIVES} from "angular2/common";

import {Component,Input, Output, EventEmitter} from "@angular/core";
import {AlertService} from "../../ReusableServices/alertService";
import {AppSettingsService} from "../../ReusableServices/appSettingsService";
import {crudService} from "../../ReusableServices/crudService";


@Component({
    template: require("./inlineEditForm.html"),
    selector: 'inlineEditForm',
})

export class inlineEditForm {
    @Output() refreshRequest = new EventEmitter<any>();
    @Input() columns:any;
    @Input() selectedRow:any;
    @Input() gridSettings:any;
    @Input() handler:any
    @Input('httpProxy') httpProxy: any;
    @Input('pageName') pageName: string = "";
    localRow:any;
    alert:AlertService;
    appSettingsService:AppSettingsService;
    pluginInput:string;
    crudService:crudService;
    callerContext:any;

    constructor(private alt: AlertService,private appSettingsSrv: AppSettingsService,private crudSrv:crudService){
        this.alert=alt;
        this.appSettingsService=appSettingsSrv;
        this.localRow=this.columns;
        this.refreshRequest.subscribe(()=>{this.handler(this.crudService.getCallerContext())});
        this.crudService=crudSrv;
        this.callerContext=this.crudService.getCallerContext();
        this.crudService.OnCrudOperationSuccess.subscribe((message)=>{
            this.saveRequested(message)}
        );
    }

    saveClicked() {
        this.crudService.updateInlineRecord(this.columns, this.gridSettings, this.pageName, this.httpProxy);
    }

    cancelClicked() {
        this.selectedRow.inlineEditEnabled = false;
    }

    saveRequested(message){
        this.refreshRequest.emit(message);
        this.selectedRow.inlineEditEnabled = false;
    }

    inputClicked(){
    }
}