import {Component, ViewChild} from '@angular/core';
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {AnalysisConstructionToolConfig, ModalGridConfig} from "./analysisConstructionTool.config";
import {ManagedProgramDbService} from "../managedProgramDbService";
import {DisplayGridComponent} from "../../../../../../ReusableComponents/displayGrid/displayGrid";

@Component({
    selector: 'analysisConstructionTool',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>
            <div class="modal" tabindex="-1" role="dialog" style="display:block !important;" *ngIf="showDialog">
                <div class="modal-dialog">
                    <div class="modal-content standard-callout-background">
                        <div class="modal-header">
                            <button type="button" class="close" (click)="closeModalWindow();"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Pending change request portfolios</h4>
                        </div>
                        <div class="modal-body">
                            <b>The following portfolios will not be processed since there is a pending change request:</b>
                            <br/>
                            <div class="col-sm-12">
                                <displayGrid [inputPageName]="modalPageName" [inputGridSettings]="modalGrid.gridSettings"
                                             [pluginInput]="modalGrid.data"></displayGrid>
                            </div>
                            <br/>
                            <b>{{modalGrid.error}}</b>
                        </div>
                    </div>
                </div>
            </div>`
})

export class MpdbAnalysisConstructionTool {

    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = AnalysisConstructionToolConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;
    showDialog: boolean = false;
    modalGrid: any = DisplayGridComponent;
    modalGridSettings: any = ModalGridConfig;
    modalPageName: any = "modalGrid";

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService,
                private mpdbService: ManagedProgramDbService)
    {}

    ngOnInit() {
        this.getTabsData();
    }

    ngOnDestroy(): void {
        this.tabsListData = [];
    }

    closeModalWindow() {
        this.showDialog = false;
        //this.gridView.gridSettings.columnConfig.forEach(x=> x.isAllowGridLevelEdit true,)
       // this.gridView.gridSettings.ChildType = "IsSpreadsheetGrid";
    }

    getTabsData() {
        this.tabControlConfig.TabsList.forEach((x)=> {
            this.tabsListData.push(
                {
                    TabKey: x.TabKey,
                    TabName: x.TabName
                });
        });
    }

    showSpecificTab(tabData){
        this.vmMatrix.showSpecificTab(this,tabData,this.mpdbService);
    }

    displayTabInfo(tabInfo) {
        this.formBuilder = null;
        this.customMessages = [];

        switch (tabInfo.TabKey) {
            case 'Admin':
                this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "AdminDisplayGrid");
                if (this.gridView) {
                    this.gridView.ShowDefault = false;
                }
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "AdminFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                this.modalGrid.gridSettings = this.modalGridSettings;
                break;
            case 'Lockdown':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "LockdownFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'ConstructionTool':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "ConstructionToolFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        switch (outputData.TabKey) {
            case 'Admin':
                this.adminAction(outputData);
                break;
            case 'Lockdown':
                //this.lockdownAction(outputData);
                break;
            case 'ConstructionTool':
                //this.constructionToolAction(outputData);
                break;
        }
    }

    adminAction(outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Module":
                var moduleSelected = outputData.updatedValue.value;
                if (moduleSelected == "") {
                    this.gridView.ShowDefault = false;
                    this.gridView.data = [];
                    break;
                }
                else {
                    this.displayModule(moduleSelected);
                }
                break;
            case "Edit":
                this.getPendingPortfolioModule(this.formBuilder.data.find(x=> x.name == "Module").val);

                break;
        }
    }

    displayModule(moduleSelected){
        this.apiService.getArrayFromQuery("ManagedProgramDB_GetModuleContent", JSON.stringify({
            Parameters: [{Name: "@ModuleIDIn", Value: moduleSelected}]})).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;

                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("displayModule.ManagedProgramDB_GetModuleContent : async error #" + error.status);
            },
            () => {}
        );
    }

    getPendingPortfolioModule(moduleSelected){
        let subscription = this.apiService.getArrayFromQuery("ManagedProgramDB_GetPendingPortfolioModule", JSON.stringify({
            Parameters: [{Name: "@ModuleIDIn", Value: moduleSelected}]})).subscribe(
            res=> {
                this.modalGrid.data = res;
                subscription.unsubscribe();
                this.showDialog = true;
            },
            error => {
                this. modalGrid.error = "getPendingPortfolioModule.ManagedProgramDB_GetPendingPortfolioModule : async error #" + error.status;
                subscription.unsubscribe();
            },
            () => {}
        );
    }
}