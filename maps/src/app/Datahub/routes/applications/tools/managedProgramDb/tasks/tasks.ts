import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {ManagedProgramDbService} from "../managedProgramDbService";
import {TasksConfig} from "./tasks.config";
import {ApiService} from "../../../../../../ReusableServices/apiService";

@Component({
    selector: 'tasks',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class MpdbTasks {

    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = TasksConfig;
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
            case 'ImportNewAccounts':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "ImportNewAccountsFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
            case 'InitiateAutoUpload':
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "InitiateAutoUploadFormBuilder");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }
                break;
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    }
}