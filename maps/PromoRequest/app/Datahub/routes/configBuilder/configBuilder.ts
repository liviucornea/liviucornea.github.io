/**
 * Created by noutaa2 on 6/30/2016.
 */
import {Component, Input} from 'angular2/core';
import {FormBuilder} from "../../../ReusableComponents/formBuilder/formBuilder";
import {matrixService} from "../../../ReusableServices/matrixService";
import {ElementRef} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";
import {ConfigBuilderColumnConfig} from "./configBuilderColumnConfig";
import {ConfigBuilderPageConfig} from "./configBuilderPageConfig";
import {InterFormsService} from "../../../ReusableServices/interFormsService";
import {ViewChild} from "angular2/core";
import {ConfigBuilderSchema} from "./ConfigBuilderSchema";
import {AlertService} from "../../../ReusableServices/alertService";
import {AppSettingsService} from "../../../ReusableServices/appSettingsService";

declare var tv4: any;
@Component({
    selector: 'login',
    templateUrl: 'app/Datahub/routes/configBuilder/configBuilder.html',
    directives: [FormBuilder]

})
export class configBuilder {

    dc:DynamicComponentLoader;
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

    schemaValidator:any;
    schemaValidationResult:any;

    //preview formbuilder related controls
    @ViewChild(FormBuilder)
    private formBuilderPreview:FormBuilder;
    formBuilderheaderTable: any;
    previewEditViewRowTable: any;
    IsPreview: boolean = false;
    deleteColumnValue: string;

    constructor(private dcl: DynamicComponentLoader,private  elementRef: ElementRef, private vmMat: matrixService,private intFormSer:InterFormsService
        ,private alert: AlertService,private appSettingsService: AppSettingsService) {
        this.dc=dcl;
        this.elemRef=elementRef;
        this.vmMatrix=vmMat;
        this.interFormService=intFormSer;
        this.interFormService.columnInserted.subscribe(x=>this.columnInserted(x));
        this.interFormService.pageInserted.subscribe(x=>this.pageInserted(x));
        this.objectResult=Object.create(null);
        this.objectResult.ColumnConfiguration=new Array<any>();
        this.schemaValidator=tv4;

        let columnObject=[{
            dbColumnName: "",
            htmlControlType:"text",
            "visiblity":true,
            "required": true,
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
            ShallHideDeleteBtn: false,
            shallHideAddBtn: false,
            IsChildPage: true,
            PaginationPageLimit: "10",
        }];

        var columnConfig=ConfigBuilderColumnConfig;

        var foreignKeyNode:any=columnConfig.ColumnConfiguration.find(x=>{return x.dbColumnName === "dataSourceAddress"});
        var foreignKeyFirstObject=this.vmMatrix.extractMatrix(foreignKeyNode.isComplexTypeInlineTemplate,foreignKeyNode.isComplexTypeInlineTemplateConfig);
        var foreignKeyHeader=this.vmMatrix.extractHeader(foreignKeyNode.isComplexTypeInlineTemplate,foreignKeyNode.isComplexTypeInlineTemplateConfig);
        var foreignKeyEditViewRowDataTable = this.vmMatrix.editMatrix(foreignKeyFirstObject[0].cells, foreignKeyHeader, foreignKeyNode.isComplexTypeInlineTemplateConfig);
        foreignKeyNode.isComplexTypeInlineTemplate=foreignKeyEditViewRowDataTable;


        this.columnObject=this.vmMatrix.extractMatrix(columnObject,columnConfig);
        this.columnHeader=this.vmMatrix.extractHeader(columnObject,columnConfig);
        this.columnEditViewRowDataTable = this.vmMatrix.editMatrix(this.columnObject[0].cells, this.columnHeader, columnConfig);

        var pageConfig=ConfigBuilderPageConfig;

        this.firstPageObject=this.vmMatrix.extractMatrix(pageObject,ConfigBuilderPageConfig);
        this.pageHeader=this.vmMatrix.extractHeader(pageObject,ConfigBuilderPageConfig);
        this.pageEditViewRowDataTable = this.vmMatrix.editMatrix(this.firstPageObject[0].cells, this.pageHeader, ConfigBuilderPageConfig);

        this.dc.loadIntoLocation(FormBuilder, this.elemRef, "formBuilder").then((component) => {
            this.formComponent=component;
            component.instance.formBuilderNotifier.subscribe((updateValue) => {
                this.RefreshDataFromFormBuilder(updateValue.value)
            });
            component.instance.IsHideCancel = true;
        })
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
        this.formComponent.instance.IsHideCancel = false;
        this.formComponent.instance.injectDataAndConfig( this.pageEditViewRowDataTable,ConfigBuilderPageConfig,'configPage');

    }
    addColumnClicked(){
        this.formComponent.instance.IsHideCancel = false;
        this.formComponent.instance.injectDataAndConfig( this.columnEditViewRowDataTable,ConfigBuilderColumnConfig,'configColumn');

    }

    pageInserted(x){;
        this.schemaValidator= tv4
        this.objectResult=x;
        this.objectResult.ColumnConfiguration=new Array<any>();
        this.jsonResult=JSON.stringify(this.objectResult);
        this.validateSchema();
    }

    columnInserted(x){
        this.schemaValidator=tv4;

        var indexPos = this.objectResult.ColumnConfiguration.findIndex(y=>y.dbColumnName.toLowerCase() === x.dbColumnName.toLowerCase());
        if(indexPos > -1)
        {
            this.objectResult.ColumnConfiguration[indexPos] = x;
        }
        else {
            this.objectResult.ColumnConfiguration.push(x);
        }

        this.jsonResult=JSON.stringify(this.objectResult);
        this.validateSchema();
    }


    validateSchema()
    {
        var result =this.schemaValidator.validateMultiple(this.objectResult, ConfigBuilderSchema);
        if (result.valid) {
            this.schemaValidationResult="Success";
        }
        else{
            this.schemaValidationResult="ERRORS:"+JSON.stringify(result.errors)+"\n MISSING:"+JSON.stringify(result.missing);
        }
    }

    previewClicked()
    {
        this.IsPreview = !this.IsPreview;
        this.formBuilderheaderTable = this.vmMatrix.extractHeader(null, this.objectResult);
        this.previewEditViewRowTable = this.vmMatrix.addMatrix(this.formBuilderheaderTable, this.objectResult);
        //this.IsPreview = true;
    }

    deleteColumnClicked()
    {
        var deletedColumnValue = this.deleteColumnValue;
        if(this.objectResult)
        {
            var x = this.objectResult.ColumnConfiguration.find(x=> x.dbColumnName.toLowerCase() === this.deleteColumnValue.toLowerCase());
            if(x)
            {
                this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
                this.alert.requestConfirmationAnswer$.subscribe(item => {
                    this.alert.askConfirmation = false;
                    if (item != "OK")
                        return;
                    //delete the column from json
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