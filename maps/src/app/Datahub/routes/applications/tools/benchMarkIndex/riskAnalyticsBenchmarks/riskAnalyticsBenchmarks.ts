import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {RiskAnalyticsBenchmarksControlConfig} from "./riskAnalyticsBenchmarks.config";
import {toDateString, toUTCDate} from "../../../../../../ReusableServices/genericfunctions";
import moment = require("moment");

@Component({
    selector: 'riskAnalyticsBenchmarks',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiRiskAnalyticsBenchmarks {

    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = RiskAnalyticsBenchmarksControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    gridView: any;
    formBuilder: any;
    listBoxData = [
        {name:'DEX Universe',value:'DEX_UNIVERSE'},
        {name:'MSCI EAFE',value:'MSCI_EAFE'},
        {name:'MSCI World Ex Canada',value:'MSCI_WORLD_EX_CANADA'},
        {name:'Nasdaq 100',value:'NASDAQ_100'},
        {name:'S&P 500',value:'SP_500'},
        {name:'S&P/TSX 60',value:'SP_TSX_60'},
        //{name:'SP_TSX_CAPPED_COMPOSITE_INDEX', value:'SP_TSX_CAPPED_COMPOSITE_INDEX'},
        {name:'S&P/TSX Composite Index',value:'SP_TSX_COMPOSITE_INDEX'},
        {name:'S&P/TSX Equity Index',value:'SP_TSX_EQUITY_INDEX'},
        {name:'MSCI ACWI',value:'MSCI_ACWI'},
        {name:'MSCI Emerging Market',value:'MSCI_Emerging_Market'},
        {name:'S&P 1500',value:'SP_1500'},
        {name:'MSCI World',value:'MSCI_WORLD'}
    ];

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
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
            this.setDefaultDate();

            var RiskAnalyticsBenchmarksIndex = this.formBuilder.data.find(x=> x.name == "RiskAnalyticsBenchmarksIndex");

            this.vmMatrix.bindCustomCheckBoxList(RiskAnalyticsBenchmarksIndex, this.listBoxData);
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    setDefaultDate(){

        this.apiService.getArrayFromQuery("Benchmark_GetLastWeekDay").subscribe(
            res=> {
                if(res[0].LastWeekDay) {
                    var d = new Date(res[0].LastWeekDay);

                    this.formBuilder.data.find(x=> x.name == "StartDate").val = toDateString(d);
                    this.formBuilder.data.find(x=> x.name == "EndDate").val = toDateString(d);
                }
            },
            error => {
                this.alert.error("Benchmark_GetLastWeekDay : async error #" + error.status);
            },
            () => {
            }
        );
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];
        if (outputData.updatedValue.controlName == "RunReport") {
            this.RunReport(outputData.updatedValue.value);
        }
    }

    RunReport(data) {
        var eqProcessID: number = 369;	//EQ process ID
        var fiProcessID: number = 370;	//FI process ID
        var fileName, importRequestedDate;
        var importParameter = [];
        var fromDate = moment(toUTCDate(new Date(data.StartDate)));
        var toDate = moment(toUTCDate(new Date(data.EndDate)));
        var indices = data.RiskAnalyticsBenchmarksIndex;

        var isEqSelected = !indices.find(x=> x == 'DEX_UNIVERSE' && indices.length == 1);

        if(indices.find(x=> x == 'DEX_UNIVERSE')){
            while(fromDate <= toDate){
                if (!(fromDate.isoWeekday() == 6 || fromDate.isoWeekday() == 7)){
                    fileName = fromDate.format("YYYYMMDD") + "_FI.csv";
                    importRequestedDate = fromDate.format('MM/DD/YYYY');
                    importParameter.push("$[FileName]=" + "UI\\" + fileName);
                    this.doArchive(fileName, fiProcessID);
                    //import.Run()
                }
                fromDate = fromDate.add(1, 'd');
            }
        }

        fromDate = moment.utc(data.StartDate);
        while(fromDate <= toDate){
            if (!(fromDate.isoWeekday() == 6 || fromDate.isoWeekday() == 7) && isEqSelected){
                fileName = fromDate.format("YYYYMMDD") + "_EQ.csv";
                importRequestedDate = fromDate.format('MM/DD/YYYY');

                indices.forEach((x)=>{
                    switch (x)
                    {
                        case 'MSCI_EAFE':
                            importParameter.push("$[DoMsciEafe]=1");
                            break;
                        case 'MSCI_WORLD_EX_CANADA':
                            importParameter.push("$[DoMsciWorldExCanada]=1");
                            break;
                        case 'NASDAQ_100':
                            importParameter.push("$[DoNasdaq100]=1");
                            break;
                        case 'SP_500':
                            importParameter.push("$[DoSp500]=1");
                            break;
                        case 'SP_TSX_60':
                            importParameter.push("$[DoSpTsx60]=1");
                            break;
                        case 'SP_TSX_CAPPED_COMPOSITE_INDEX':
                            importParameter.push("$[DoSpTsxCappedCompositeIndex]=1");
                            break;
                        case 'SP_TSX_COMPOSITE_INDEX':
                            importParameter.push("$[DoSpTsxCompositeIndex]=1");
                            break;
                        case 'SP_TSX_EQUITY_INDEX':
                            importParameter.push("$[DoSpTsxEquityIndex]=1");
                            break;
                        case 'MSCI_ACWI':
                            importParameter.push("$[DoMsciAcwi]=1");
                            break;
                        case 'MSCI_Emerging_Market':
                            importParameter.push("$[DoMSCIEmergingMarket]=1");
                            break;
                        case 'SP_1500':
                            importParameter.push("$[DoSP1500]=1");
                            break;
                        case 'MSCI_WORLD':
                            importParameter.push("$[DoMsciWorld]=1");
                            break;
                    }
                    importParameter.push("$[FileName]=" + "UI\\" + fileName);
                });

                /*importParameter.push("$[DoMsciEafe]=" + (indices.find(x=> x == 'MSCI_EAFE')?1:0));
                importParameter.push("$[DoMsciWorldExCanada]=" + (indices.find(x=> x == 'MSCI_WORLD_EX_CANADA')?1:0));
                importParameter.push("$[DoNasdaq100]=" + (indices.find(x=> x == 'NASDAQ_100')?1:0));
                importParameter.push("$[DoSp500]=" + (indices.find(x=> x == 'SP_500')?1:0));
                importParameter.push("$[DoSpTsx60]=" + (indices.find(x=> x == 'SP_TSX_60')?1:0));
                importParameter.push("$[DoSpTsxCappedCompositeIndex]=" + (indices.find(x=> x == 'SP_TSX_CAPPED_COMPOSITE_INDEX')?1:0));
                importParameter.push("$[DoSpTsxCompositeIndex]=" + (indices.find(x=> x == 'SP_TSX_COMPOSITE_INDEX')?1:0));
                importParameter.push("$[DoSpTsxEquityIndex]=" + (indices.find(x=> x == 'SP_TSX_EQUITY_INDEX')?1:0));
                importParameter.push("$[DoMsciAcwi]=" + (indices.find(x=> x == 'MSCI_ACWI')?1:0));
                importParameter.push("$[DoMSCIEmergingMarket]=" + (indices.find(x=> x == 'MSCI_Emerging_Market')?1:0));
                importParameter.push("$[DoSP1500]=" + (indices.find(x=> x == 'SP_1500')?1:0));
                importParameter.push("$[DoMsciWorld]=" + (indices.find(x=> x == 'MSCI_WORLD')?1:0));
                importParameter.push("$[FileName]=" + "UI\\" + fileName);*/

                this.doArchive(fileName, eqProcessID);
                //import.Run()
            }
            fromDate = fromDate.add(1, 'd');
        }
    }

    doArchive(filename, processID){
        //SELECT [Sink] FROM tblTransferFileProcess WHERE ProcessID={0}
    }
}