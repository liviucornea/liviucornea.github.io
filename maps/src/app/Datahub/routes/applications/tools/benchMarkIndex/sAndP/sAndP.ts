import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {SandPControlConfig} from "./sAndP.config";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'sAndP',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiSandP {

    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = SandPControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService) {
    }

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
        this.vmMatrix.showSpecificTab(this,tabData);
    }

    displayTabInfo(tabInfo) {
        this.customMessages = [];

        this.gridView = tabInfo.TabControls.find(x=> x.ComponentName == "DisplayGrid");
        if (this.gridView) {
            this.gridView.ShowDefault = false;
        }

        this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "FormBuilder");
        if (this.formBuilder) {
            var d = new Date();
            d.setDate(d.getDate()-2);

            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(x=> x.name == "ReportDate").val = toDateString(d);
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "Preview") {
            this.showReport();
        }
    }

    showReport() {
        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;
        var spSelected = this.formBuilder.data.find(x=> x.name == "SandPSubIndex").val;
        var sQuery;

        if (spSelected.indexOf("sp_Benchmark_GetSPDJGlobalIndex") != -1 || spSelected.indexOf("sp_Benchmark_GetSPIndexConstituent") != -1){
            sQuery = spSelected.replace("NULL", " '" + selectedDate + "'");
        }
        else{
            sQuery = spSelected + " '" + selectedDate + "'";
        }
        this.apiService.getArrayFromQuery("GetSPIndex", JSON.stringify({
            Parameters: [
                {Name: "@pSpName", Value: sQuery}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;
                this.gridView.data = res;
                if( res.length > 0){
                    var messageBlock = [res.length + (res.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("GetSPIndex : async error #" + error.status);
            },
            () => {
            }
        );
    }
}