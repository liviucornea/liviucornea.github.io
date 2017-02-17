import {Component, Input, SimpleChange} from "@angular/core";
import {AddEditPortfolioFormBuilderConfig} from "./addEditPortfolio.config";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../ReusableServices/matrixService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {toDateString} from "../../../../../ReusableServices/genericfunctions";
import {InterFormsService} from "../../../../../ReusableServices/interFormsService";

export interface Portfolio {
    Id?: number;
    PortfolioName?: string;
    PortfolioNumber?: string;
    PortfolioManager?: string;
    ProjectedAUM?: number;
    InceptionDate?: string;
    Notes?: string;
}

@Component({
    selector: 'addEditPortfolio',
    template: `<formBuilder [gridSettings]="gridSettings"
                             [httpProxy]="httpProxy" [pluginInput]="formData"
                             [PageType]="pageOperationType"
                             (formBuilderNotifier)="updateDataFromComponents($event)"></formBuilder>`
})

export class AddEditPortfolio {

    @Input() pluginInput: any;
    @Input() httpProxy: any;
    @Input() addEditMode: string = 'add';
    @Input('PageType') PageType: string = "dynamicform";
    @Input() SystemId: number;
    gridSettings: any = AddEditPortfolioFormBuilderConfig;
    formData: any;
    isPageLoaded: boolean = false;
    pageOperationType: string;
    emptyPortfolio:Portfolio = {
        Id:0,
        PortfolioName:'',
        PortfolioNumber:'',
        PortfolioManager:'',
        ProjectedAUM:0,
        InceptionDate:toDateString(new Date()),
        Notes:''
    };
    portfolio: Portfolio = {};

    constructor(private alert: AlertService, private vmMatrix: matrixService, private apiService: ApiService,
                private intFormSvc: InterFormsService){

        this.setPortfolio(this.emptyPortfolio);
    }

    ngOnInit() {
        this.isPageLoaded = true;
        this.pageOperationType = this.PageType;
    }

    setPortfolio(p: Portfolio): void {
        this.portfolio = {
            Id: p.Id != null ? p.Id : this.portfolio.Id,
            PortfolioName: p.PortfolioName != null ? p.PortfolioName : this.portfolio.PortfolioName,
            PortfolioNumber: p.PortfolioNumber != null ? p.PortfolioNumber : this.portfolio.PortfolioNumber,
            PortfolioManager: p.PortfolioManager != null ? p.PortfolioManager : this.portfolio.PortfolioManager,
            ProjectedAUM: p.ProjectedAUM != null ? p.ProjectedAUM : this.portfolio.ProjectedAUM,
            InceptionDate: p.InceptionDate != null ? p.InceptionDate : this.portfolio.InceptionDate,
            Notes: p.Notes != null ? p.Notes : this.portfolio.Notes
        };
    }

    populatePortfolioManagers(systemTypeSelected: number){
        var PortfolioManager = this.formData.find(x=> x.name == "PortfolioManager");
        var iPMGroupID: number;
        if(systemTypeSelected == 18) {
            iPMGroupID = 237;
        }
        else if(systemTypeSelected == 19) {
            iPMGroupID = 238;
        }
        else if(systemTypeSelected == 23) {
            iPMGroupID = 421;
        }

        this.apiService.getArrayFromQuery("ManagedProgramDB_Lookup", JSON.stringify({
            Parameters: [{Name: "@type", Value: 3},
                {Name: "@GroupID", Value: iPMGroupID},
                {Name: "@LoginName", Value: this.apiService.CurrentUser.LoginName }]
        })).subscribe(
            res=> {
                this.vmMatrix.bindCustomDropDown(PortfolioManager, res);
            },
            error => {
                this.alert.error("populatePortfolioManagers.ManagedProgramDB_Lookup. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}){
        this.formData = null;
        var currentValue;

        if (changes['addEditMode']) {
            if(this.addEditMode == 'add'){
                this.gridSettings.CustomButtons.find(x=> x.name == "OpenChangeForm").visible = false;
                this.gridSettings.CustomButtons.find(x=> x.name == "Add").visible = true;
                this.gridSettings.CustomButtons.find(x=> x.name == "Update").visible = false;
                this.gridSettings.CustomButtons.find(x=> x.name == "Reset").visible = true;
                this.gridSettings.ColumnConfiguration.find(x=> x.dbColumnName == "PortfolioNumber").disabled = false;

                currentValue = this.portfolio;
            }
            else if(this.addEditMode == 'edit'){
                this.setPortfolio(this.emptyPortfolio);
                this.gridSettings.CustomButtons.find(x=> x.name == "Add").visible = false;
                this.gridSettings.CustomButtons.find(x=> x.name == "Reset").visible = false;
            }
        }
        else if (changes['pluginInput'] && this.isPageLoaded) {
            currentValue = changes['pluginInput'].currentValue;
            let oldValue = changes['pluginInput'].previousValue;
            if (currentValue != oldValue) {
             this.gridSettings.CustomButtons.find(x=> x.name == "OpenChangeForm").visible = true;
                this.gridSettings.CustomButtons.find(x=> x.name == "Add").visible = false;
                this.gridSettings.CustomButtons.find(x=> x.name == "Reset").visible = true;
                this.gridSettings.CustomButtons.find(x=> x.name == "Update").visible = true;
                this.gridSettings.ColumnConfiguration.find(x=> x.dbColumnName == "PortfolioNumber").disabled = true;
            }
        }

        if(currentValue) {
            var PortfolioManager = this.gridSettings.ColumnConfiguration.find(x=> x.dbColumnName == "PortfolioManager");
            PortfolioManager.displayName = ((this.SystemId == 18 || this.SystemId == 23) ? "Portfolio Manager" : "IA Code");
            this.formData = this.vmMatrix.getFormBuilderControls(this.gridSettings, currentValue);
            this.populatePortfolioManagers(this.SystemId);
        }
    }

    updateDataFromComponents(event){
        switch (event.controlName) {
            case "Add":
                this.portfolio = event.value;
                this.savePortfolio(1);
                break;
            case "Reset":
                this.formData.find(x=> x.name == "PortfolioNumber").val = "";
                this.formData.find(x=> x.name == "PortfolioName").val = "";
                var PortfolioManager = this.formData.find(x=> x.name == "PortfolioManager");
                this.vmMatrix.bindCustomDropDown(PortfolioManager, null);
                this.formData.find(x=> x.name == "ProjectedAUM").val = "";
                this.formData.find(x=> x.name == "InceptionDate").val = toDateString(new Date());
                this.formData.find(x=> x.name == "Notes").val = "";
                this.setPortfolio(this.emptyPortfolio);
                this.intFormSvc.stopSpinner();
                break;
            case "Update":
                this.portfolio = event.value;
                this.savePortfolio(2);
                break;
        }
    }

    savePortfolio(type){
        this.apiService.getArrayFromQuery("ManagedProgramDB_Portfolio", JSON.stringify({
            Parameters: [{Name: "@Type", Value: type},
                {Name: "@Id", Value: this.portfolio.Id},
                {Name: "@PortfolioNumber", Value: this.portfolio.PortfolioNumber},
                {Name: "@PortfolioName", Value: this.portfolio.PortfolioName},
                {Name: "@PortfolioManager", Value: this.portfolio.PortfolioManager},
                {Name: "@ProjectedAUM", Value: this.portfolio.ProjectedAUM},
                {Name: "@InceptionDate", Value: this.portfolio.InceptionDate},
                {Name: "@Notes", Value: this.portfolio.Notes},
                {Name: "@SystemId", Value: this.SystemId},
                {Name: "@LoginName", Value: this.apiService.CurrentUser.LoginName},
                {Name: "@LookupYear", Value: ''}]
        })).subscribe(
            res=>{
                switch (res[0].Column1){
                    case 1:
                        this.alert.addAlert("Portfolio Added Successfully.");
                        break;
                    case -1:
                        this.alert.addAlert("Portfolio Already Exists.");
                        break;
                    case 2:
                        this.alert.addAlert("Portfolio Updated Successfully.");
                        var p = this.pluginInput;
                        Object.assign(p,this.portfolio);
                        break;
                    case 3:
                        this.alert.addAlert("Portfolio Deleted Successfully.");
                        break;
                }

            },
            error => {
                this.alert.error("savePortfolio.ManagedProgramDB_Portfolio : async error #" + error.status);
            },
            () => {}
        );
    }
}