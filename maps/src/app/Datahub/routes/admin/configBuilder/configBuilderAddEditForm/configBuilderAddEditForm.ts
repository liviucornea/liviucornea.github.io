import {Component, Output, EventEmitter,Input, ElementRef} from "@angular/core";

import {InterFormsService} from "../../../../../ReusableServices/interFormsService";
import {matrixService} from "../../../../../ReusableServices/matrixService";

@Component({
    template: require("./configBuilderAddEditForm.html"),
    selector: 'configBuilderAddEditForm'
})

export class configBuilderAddEditForm{

    @Input('originalInput') originalInput: any;
    @Input() pluginInput: any;
    @Input() gridSettings: any;

    @Input('pageType') PageType: string = "view";
    @Input('pageName') pageName: string = "";

    attributesVM: Array<any>;
    pluginValue: string = "";
    visiblePlugin: boolean = true;
    editViewRowDataTable: Array<any>;

    selectionArray: Array<any>;

    elemRef: ElementRef;
    interFormsService:InterFormsService;
    selectedInput:any;

    @Input('NodeClass') nodeClass: string;

    constructor( private intFormSer:InterFormsService, private matrixService: matrixService) {
        this.interFormsService=intFormSer;
    }

    ngOnInit() {
        this.editViewRowDataTable = this.pluginInput;
    }

    cancelClicked(){
        this.interFormsService.closeCurrentlyOpenedForm();
    }

    saveClicked() {
        var primaryColumnName = this.matrixService.getPrimaryColumnName(this.gridSettings);
        this.pluginValue =  this.matrixService.buildJSONObject(this.editViewRowDataTable, primaryColumnName);

        switch (this.PageType) {
            case "configBuilderAddColumn":
                this.interFormsService.columnInserted.emit(this.pluginValue);
                break;
            case "configBuilderAddPage":
                this.interFormsService.pageInserted.emit(this.pluginValue);
                break;
        }
    }

    inputClicked(input) {
        if (input === undefined) {
            return;
        }
        this.selectedInput = input;
        var inputConfig: any = this.gridSettings.ColumnConfiguration.find(z=>z.dbColumnName=== input.name);
        if (inputConfig.isComplexTypeInline) {
            input.isToggleable=true;
            this.interFormsService.assignControl(input);
        }
    }
}