import {Component, ElementRef, ViewChild} from "@angular/core";
import {FormBuilder} from "@angular/forms";

import {matrixService} from "../../../../ReusableServices/matrixService";
import {InterFormsService} from "../../../../ReusableServices/interFormsService";
import {AppSettingsService} from "../../../../ReusableServices/appSettingsService";
import {AlertService} from "../../../../ReusableServices/alertService";
import {ConfigBuilderColumnConfig} from "./configBuilderColumnConfig";
import {ConfigBuilderPageConfig} from "./configBuilderPageConfig";
import {configBuilderAddEditForm} from "./configBuilderAddEditForm/configBuilderAddEditForm";
import {ConfigBuilderRuleAndSchema} from "./configBuilderMetaRules";
import {JsonSchemaRuleFactory} from "../../../../ReusableServices/rulesSource/StandardValidation/FormSchema";
import {Location} from "@angular/common"
import {NavigationService} from "../../../../ReusableServices/navigationService";

@Component({
    selector: 'login',
    template: require('./configBuilder.html'),
    //TODO:RF
    //directives: [configBuilderAddEditForm]
})

export class ConfigBuilder {

    //dc:DynamicComponentLoader;
    elemRef: ElementRef;
    vmMatrix: matrixService;
    interFormService:InterFormsService;

    firstPageObject:any;
    pageEditViewRowDataTable :any;
    pageHeader:any;

    columnObject:any;
    columnEditViewRowDataTable :any;
    columnHeader:any;

    formComponent:any;

    jsonResult:string="Hello";
    objectResult:any;

    schemaValidationResult:any;

    isPageForm:boolean;
    isColumnForm:boolean;
    config:any;

    selectedPageType:string;

    //preview formbuilder related controls
    @ViewChild(FormBuilder)
    private formBuilderPreview:FormBuilder;
    formBuilderheaderTable: any;
    previewEditViewRowTable: any;
    IsPreview: boolean = false;
    deleteColumnValue: string;
    pageConfig: any = ConfigBuilderPageConfig;
    columnConfig: any = ConfigBuilderColumnConfig;
    configBuilderRuleAndSchema: any = ConfigBuilderRuleAndSchema;
    ruleObj:any;

    constructor(private  elementRef: ElementRef, private vmMat: matrixService,private intFormSer:InterFormsService
        ,private alert: AlertService,private appSettingsService: AppSettingsService, private navService:NavigationService, private location:Location)//private dcl: DynamicComponentLoader,
    {
        this.ruleObj = new JsonSchemaRuleFactory(this.configBuilderRuleAndSchema).CreateRule("ConfigBuilderRuleAndSchema");
        //navService.setCurrentPage(location.path(false));

        //this.dc=dcl;
        this.elemRef=elementRef;
        this.vmMatrix=vmMat;
        this.interFormService=intFormSer;
        this.interFormService.columnInserted.subscribe(x=>this.columnInserted(x));
        this.interFormService.pageInserted.subscribe(x=>this.pageInserted(x));
        this.objectResult=Object.create(null);
        this.objectResult.ColumnConfiguration=new Array<any>();


        let columnObject=[{
            dbColumnName: "",
            htmlControlType:"text",
            "isVisible":true,
            "isRequired": true,
            "isComplexType":false,
            "displayName": "",
            "dataSourceAddress": "",
            "dataSource": "",
            "regex": "",
            "columnCss": ""
        }];

        let pageObject=[{
            ChildType: "",
            PrimaryKeyColumn: "",
            ForeignKeyColumn: "",
            ShallHideDeleteButton: false,
            ShallHideAddButton: false,
            IsChildPage: true,
            ShowFilterRow: false,
            PaginationPageLimit: "10",
        }];

        var foreignKeyNode:any = this.columnConfig.find(x=>{return x.dbColumnName === "dataSourceAddress"});
        var foreignKeyFirstObject=this.vmMatrix.extractMatrix(foreignKeyNode.isComplexTypeInlineTemplate,foreignKeyNode.isComplexTypeInlineTemplateConfig);
        var foreignKeyHeader=this.vmMatrix.extractHeader(foreignKeyNode.isComplexTypeInlineTemplate,foreignKeyNode.isComplexTypeInlineTemplateConfig);
        var foreignKeyEditViewRowDataTable = this.vmMatrix.editMatrix(foreignKeyFirstObject[0].cells, foreignKeyHeader, foreignKeyNode.isComplexTypeInlineTemplateConfig);
        foreignKeyNode.isComplexTypeInlineTemplate=foreignKeyEditViewRowDataTable;

        this.columnObject=this.vmMatrix.extractMatrix(columnObject,this.columnConfig);
        this.columnHeader=this.vmMatrix.extractHeader(columnObject,this.columnConfig);
        this.columnEditViewRowDataTable = this.vmMatrix.editMatrix(this.columnObject[0].cells, this.columnHeader, this.columnConfig);

        this.firstPageObject=this.vmMatrix.extractMatrix(pageObject,this.pageConfig);
        this.pageHeader=this.vmMatrix.extractHeader(pageObject,this.pageConfig);
        this.pageEditViewRowDataTable = this.vmMatrix.editMatrix(this.firstPageObject[0].cells, this.pageHeader, this.pageConfig);

    }

    RefreshDataFromFormBuilder(updatedValue) {
        console.log(updatedValue);
        if (updatedValue === "cancel") {
            this.cancelClicked();
        }
        else {
            this.PageRefreshFromDynamicComponent(updatedValue);
        }
    }

    PageRefreshFromDynamicComponent(data) {

    }

    cancelClicked() {

    }

    addPageClicked(){
        this.selectedPageType="configBuilderAddPage";
        this.config = this.pageConfig;
        this.isPageForm = true;
        this.isColumnForm = false;
    }

    addColumnClicked(){
        this.selectedPageType="configBuilderAddColumn"
        this.config = this.columnConfig;
        this.isPageForm = false;
        this.isColumnForm = true;
    }

    pageInserted(x){;

        this.objectResult=x;
        this.objectResult.ColumnConfiguration=new Array<any>();
        this.jsonResult=JSON.stringify(this.objectResult);
        this.validateSchema();
    }

    columnInserted(x){

        var indexPos = this.objectResult.ColumnConfiguration.findIndex(y=>y.dbColumnName.toLowerCase() === x.dbColumnName.toLowerCase());
        if(indexPos > -1){
            this.objectResult.ColumnConfiguration[indexPos] = x;
        }
        else {
            this.objectResult.ColumnConfiguration.push(x);
        }
        this.jsonResult=JSON.stringify(this.objectResult);
        this.validateSchema();
    }


    validateSchema(){
        var result = this.ruleObj.Validate(this.objectResult);
        if (!result.HasErrors) {
            this.schemaValidationResult="Success";
        }
        else{
            this.schemaValidationResult="ERRORS:";
        }
    }

    previewClicked(){
        this.IsPreview = !this.IsPreview;
        this.formBuilderheaderTable = this.vmMatrix.extractHeader(null, this.objectResult);
        this.previewEditViewRowTable = this.vmMatrix.getFormBuilderControls(this.objectResult);
    }

    deleteColumnClicked(){
        var deletedColumnValue = this.deleteColumnValue;
        if(this.objectResult){
            var x = this.objectResult.ColumnConfiguration.find(x=> x.dbColumnName.toLowerCase() === this.deleteColumnValue.toLowerCase());
            if(x){
                this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
                this.alert.requestConfirmationAnswer$.subscribe(item => {
                    this.alert.askConfirmation = false;
                    if (item != "OK")
                        return;
                    this.objectResult.ColumnConfiguration.forEach(function(item, index, object)
                    {
                        if(item.dbColumnName.toLowerCase() === deletedColumnValue.toLowerCase())
                        {
                            object.splice(index,1);
                        }
                    });
                    this.alert.addAlert("column deleted successfully");
                    this.jsonResult = JSON.stringify(this.objectResult);
                    this.validateSchema();
                });
            }
            else {
                this.alert.error("column " + this.deleteColumnValue + " does not exist in json!!!");
            }
        }
    }
}
