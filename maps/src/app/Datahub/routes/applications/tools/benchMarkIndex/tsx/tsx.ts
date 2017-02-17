import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {TsxControlConfig} from "./tsx.config";
import {toDateString, toCamelCase} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'tsx',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiTsx {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = TsxControlConfig;
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
            var date = toDateString(d);

            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.formBuilder.data.find(x=> x.name == "ReportDate").val = date;
            this.getTsxSubIndexLookup();
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];
        switch (outputData.updatedValue.controlName) {
            case "Preview":
                this.showReport();
                break;
        }
    }

    getTsxSubIndexLookup(){
        var tsxSubIndex = this.formBuilder.data.find(x=> x.name == "TsxSubIndex");

        var apiParams: Array<any> = [{url: "GetTSXSubIndexLookup"}, {url: "GetTSXLookup"}];

        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(
            res=> {
                res[0].forEach(x=> {
                    res[1].forEach(y=> {
                       if(y.value && y.value.indexOf(x.value) > -1){
                            let tempName = toCamelCase(y.name);
                            x.name = tempName.replace('S&p/tsx', 'S&P/TSX');
                        }
                    });
                });

                this.vmMatrix.bindCustomDropDown(tsxSubIndex, res[0]);
            },
            error => {
                this.alert.error("GetTSXSubIndexLookup. Error in retrieving drop down info" + error.status);
            },
            () => {
            }
        );
    }

    showReport() {
        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;
        var tsxSubIndex = this.formBuilder.data.find(x=> x.name == "TsxSubIndex").val;

        this.apiService.getArrayFromQuery("Benchmark_GetTSXIndex", JSON.stringify({
            Parameters: [{Name: "@Date", Value: selectedDate},
                {Name: "@Index", Value: tsxSubIndex}]
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
                this.alert.error("Benchmark_GetTSXIndex : async error #" + error.status);
            },
            () => {
            }
        );
    }
}