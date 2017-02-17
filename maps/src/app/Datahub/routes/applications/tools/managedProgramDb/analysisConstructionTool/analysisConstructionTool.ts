import {Component, ViewChild} from '@angular/core';
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {AnalysisConstructionToolConfig} from "./analysisConstructionTool.config";
import {ManagedProgramDbService} from "../managedProgramDbService";

@Component({
    selector: 'analysisConstructionTool',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class MpdbAnalysisConstructionTool {

    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = AnalysisConstructionToolConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService,
                private mpdbService: ManagedProgramDbService)
    {}

    ngOnInit() {
        this.getTabsData();
    }

    ngOnDestroy(): void {
        this.tabsListData = [];
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
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "AdminFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
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
}