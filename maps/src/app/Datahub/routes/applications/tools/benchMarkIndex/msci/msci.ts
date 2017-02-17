import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../../../ReusableServices/alertService";
import {matrixService} from "../../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../../ReusableServices/apiService";
import {TabBuilder} from "../../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {MsciControlConfig} from "./msci.config";
import {toDateString} from "../../../../../../ReusableServices/genericfunctions";

@Component({
    selector: 'msci',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class BmiMsci {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = MsciControlConfig;
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
            this.formBuilder.data.find(x=> x.name == "IndexType").val = "REGION";
            this.formBuilder.data.find(x=> x.name == "IndexTypeInclude").val = "NONE";
            this.formBuilder.data.find(x=> x.name == "IndexTypeExclude").val = "NONE";
        }
        this.tabBuilderControl.displayTabInfo(tabInfo);
    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];

        switch (outputData.updatedValue.controlName) {

            case "IndexType":
                this.formBuilder.data.find(x=> x.name == "Region").isVisible = outputData.updatedValue.value == "REGION";
                this.formBuilder.data.find(x=> x.name == "Country").isVisible = outputData.updatedValue.value == "COUNTRY";
                break;
            case "IndexTypeInclude":
                this.formBuilder.data.find(x=> x.name == "RegionInclude").isVisible = outputData.updatedValue.value == "REGION";
                this.formBuilder.data.find(x=> x.name == "CountryInclude").isVisible = outputData.updatedValue.value == "COUNTRY";
                break;
            case "IndexTypeExclude":
                this.formBuilder.data.find(x=> x.name == "RegionExclude").isVisible = outputData.updatedValue.value == "REGION";
                this.formBuilder.data.find(x=> x.name == "CountryExclude").isVisible = outputData.updatedValue.value == "COUNTRY";
                break;
            case "Preview":
                this.showReport();
                break;
        }
    }

    getSummaryData(data){
        var countriesSummary = [];
        var countries = this.formBuilder.data.find(x=> x.name == "Country");
        countries.masterdataSource.forEach((x) => {
            var countryData = data.filter(y=> y.ISO == x.value);

            if(countryData.length > 0) {
                var weightSum = 0;
                var closingMarketCapSum = 0;
                for (var i=countryData.length; i--;) {
                    weightSum+=countryData[i].Weight;
                    closingMarketCapSum+=countryData[i].Closing_Security_Market_Cap;
                }

                countriesSummary.push({
                    RegionCountry: x.name, CountryCode: x.value,
                    ClosingMarketCap: closingMarketCapSum, Weight: weightSum
                });
            }

        });
        return countriesSummary;
    }

    getCountrySummaryData(data, iso){
        var summary = [];
        var countryData = data.filter(x=> x.ISO == iso);
        countryData.forEach((x)=> {
            summary.push({CountryCode: x.ISO, Weight: x.Weight, Date: x.Date, Name: x.Name,
                TICKER: x.TICKER, IndexMarketCap: x.Index_Market_Cap, ForeignInclusionFactor: x.foreign_inclusion_factor,
                Price: x.price, Currency: x.Price_ISO_currency_symbol});
        });

        return summary;
    }

    showReport() {
        var indexType: number;
        var includeIndexType: number = -1;
        var excludeIndexType: number = -1;
        var indexCode: string = "";
        var includeIndexCode: string = "";
        var excludeIndexCode: string = "";

        var selectedDate = this.formBuilder.data.find(x=> x.name == "ReportDate").val;

        var indexTypeSelected = this.formBuilder.data.find(x=> x.name == "IndexType").val;
        var regionsSelected = this.formBuilder.data.find(x=> x.name == "Region").val;
        var countriesSelected = this.formBuilder.data.find(x=> x.name == "Country").val;

        var includeIndexTypeSelected = this.formBuilder.data.find(x=> x.name == "IndexTypeInclude").val;
        var includeRegionsSelected = this.formBuilder.data.find(x=> x.name == "RegionInclude").val;
        var includeCountriesSelected = this.formBuilder.data.find(x=> x.name == "CountryInclude").val;

        var excludeIndexTypeSelected = this.formBuilder.data.find(x=> x.name == "IndexTypeExclude").val;
        var excludeRegionsSelected = this.formBuilder.data.find(x=> x.name == "RegionExclude").val;
        var excludeCountriesSelected = this.formBuilder.data.find(x=> x.name == "CountryExclude").val;

        if(indexTypeSelected == "REGION"){
            indexType = 0;
            indexCode = regionsSelected;
        }
        else if(indexTypeSelected == "COUNTRY"){
            indexType = 1;
            indexCode = countriesSelected;
        }

        if (includeIndexTypeSelected == "REGION"){
            includeIndexType = 0;
            includeIndexCode = includeRegionsSelected;
        }
        else if (includeIndexTypeSelected == "COUNTRY"){
            includeIndexType = 1;
            includeIndexCode = includeCountriesSelected;
        }

        if (excludeIndexTypeSelected == "REGION") {
            excludeIndexType = 0;
            excludeIndexCode = excludeRegionsSelected;
        }
        else if (excludeIndexTypeSelected == "COUNTRY") {
            excludeIndexType = 1;
            excludeIndexCode = excludeCountriesSelected;
        }

        this.apiService.getArrayFromQuery("Benchmark_GetMSCIIndex", JSON.stringify({
            Parameters: [
                {Name: "@pReportDate", Value: selectedDate},
                {Name: "@pIndexType", Value: indexType},
                {Name: "@pIndexCode", Value: indexCode},
                {Name: "@pIncludeIndexType", Value: includeIndexType},
                {Name: "@pIncludeIndexCode", Value: includeIndexCode},
                {Name: "@pExcludeIndexType", Value: excludeIndexType},
                {Name: "@pExcludeIndexCode", Value: excludeIndexCode}]
        })).subscribe(
            res=> {
                this.gridView.ShowDefault = true;

                var masterData = this.getSummaryData(res);
                if( masterData.length > 0){
                    var messageBlock = [masterData.length + (masterData.length > 1 ? " records " : " record ") + "found"];
                    this.customMessages.push({text: messageBlock, alert: "alert-info"});
                }
                masterData.forEach(p=> {
                        p.childData = res.filter(c=>c.ISO == p.CountryCode);
                    });
                this.gridView.data = masterData;
                this.tabBuilderControl.LoadSpecificTabsByUpdate(this.updatedControlsList);
            },
            error => {
                this.alert.error("GetMSCIIndex : async error #" + error.status);
            },
            () => {
            }
        );

    }
}