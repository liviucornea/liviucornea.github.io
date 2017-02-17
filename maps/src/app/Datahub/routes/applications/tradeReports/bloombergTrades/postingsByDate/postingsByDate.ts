import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {PostingsByDateControlConfig} from "./postingsByDate.config";

@Component({
    selector: 'postingsByDate',
    template: `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class PostingsByDate {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = PostingsByDateControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    detailsGridView: any;
    summaryGridView: any;
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

        this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "FormBuilder");
        if (this.formBuilder) {
            this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);

            this.formBuilder.data.find(x=> x.name == "ReportDate").val = this.formBuilder.data.find(x=> x.name == "ReportDate").dataSource[0].Value;
            this.formBuilder.data.find(x=> x.name == "ProductGroup").val = "";
            this.formBuilder.data.find(x=> x.name == "PortfolioType").val = "";
            this.formBuilder.data.find(x=> x.name == "Portfolio").val = "";
            this.formBuilder.data.find(x=> x.name == "CustodianAccount").val = "";
            this.formBuilder.data.find(x=> x.name == "CustodianBulkAccount").val = "";
            this.formBuilder.data.find(x=> x.name == "Status").val = "0";
        }

        this.detailsGridView = tabInfo.TabControls.find(x=> x.ComponentName == "DetailsDisplayGrid");
        if (this.detailsGridView) {
            this.detailsGridView.ShowDefault = false;
        }

        this.summaryGridView = tabInfo.TabControls.find(x=> x.ComponentName == "SummaryDisplayGrid");
        if (this.summaryGridView) {
            this.summaryGridView.ShowDefault = false;
        }

        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.updatedControlsList = [];
        this.customMessages = [];

        if (outputData.updatedValue.controlName == "RunReport") {
            this.showReport();
        }
    }

    showReport() {
        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;
        var status = this.formBuilder.data.find(x=> x.name == "Status").val;
        var portfolioType = this.formBuilder.data.find(x=> x.name == "PortfolioType").val;
        var productGroup = this.formBuilder.data.find(x=> x.name == "ProductGroup").val;
        var portfolio = this.formBuilder.data.find(x=> x.name == "Portfolio").val;
        var custodianAccount = this.formBuilder.data.find(x=> x.name == "CustodianAccount").val;
        var custodianBulkAccount = this.formBuilder.data.find(x=> x.name == "CustodianBulkAccount").val;


        var apiParams: Array<any> = [
            {url: "BloombergTradesReportDetails",
                body:{
                    Parameters: [
                        {Name: "@Date", Value: selectedDate},
                        {Name: "@iStatus", Value: status},
                        {Name: "@sPortfolioType", Value: portfolioType},
                        {Name: "@sProductGroup", Value: productGroup},
                        {Name: "@sPortfolio", Value: portfolio},
                        {Name: "@sCustodianAccount", Value: custodianAccount},
                        {Name: "@sCustodianBulkAccount", Value: custodianBulkAccount}
                    ]
                }
            },
            {url: "BloombergTradesReportSummary",
                body:{
                    Parameters: [
                        {Name: "@Date", Value: selectedDate},
                        {Name: "@iStatus", Value: status},
                        {Name: "@sPortfolioType", Value: portfolioType},
                        {Name: "@sProductGroup", Value: productGroup},
                        {Name: "@sPortfolio", Value: portfolio},
                        {Name: "@sCustodianAccount", Value: custodianAccount},
                        {Name: "@sCustodianBulkAccount", Value: custodianBulkAccount}
                    ]
                }
            }
        ];


        this.apiService.getMultipleArrayFromQuery(apiParams).subscribe(
            res=> {
                this.detailsGridView.ShowDefault = true;
                this.detailsGridView.data = res[0];

                var nAccepted = res[0].filter(x=> x.Status == "[A]").length;
                var nRejected = res[0].filter(x=> x.Status == "[N]").length;
                var nXRefError = res[0].filter(x=> x.Status == "[X]").length;

                if( res[0].length > 0){
                    var messageBlock = ["Total Allocations", "Received: " + res[0].length, "Accepted: " + nAccepted, "Rejected: " + nRejected, "XRef Errors: " + nXRefError];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }

                this.summaryGridView.ShowDefault = true;
                this.summaryGridView.data = res[1];

                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("BloombergTradesReportDetails : async error #" + error.status);
            },
            () => {
            }
        );
    }
}