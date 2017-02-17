//import {FORM_DIRECTIVES} from "angular2/common";

import {Component, Output, EventEmitter,Input} from "@angular/core";




@Component({
    template: require("./reportBuilder.html"),
    selector: 'reportBuilder',
})

export class ReportBuilder {


    pluginValue: string = "";
    visiblePlugin: boolean = true;
    showValidation: boolean = false;
    enableInsert: boolean = false;
    @Output() formBuilderNotifier = new EventEmitter();
    @Input() title: string="Form";
    @Input() pluginInput: any;
    @Input() gridSettings: any;
    isEmptyResult: boolean = false;
    editViewRowDataTable: Array<any>;
    selectedInput: any;
    @Input('PageType') PageType: string = "view";
    @Input('pageName') pageName: string = "";
    @Input('httpProxy') httpProxy: any;
    @Input('IsHideCancel') IsHideCancel: boolean = false;
    selectionArray: Array<any>;
    @Input('NodeClass') nodeClass: string;

    constructor() {

    }

    ngOnInit() {
        this.editViewRowDataTable = this.pluginInput;
    }

    injectDataAndConfig(data:any,config:any,pageType:string){
        this.gridSettings=config;
        this.PageType=pageType;
        this.editViewRowDataTable = data;
    }

}