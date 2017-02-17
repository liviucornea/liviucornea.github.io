import {Component, Input, ViewChild} from "angular2/core";
import {RouterOutlet} from "angular2/router";
import {NavBarVert} from "../../../../../ReusableComponents/navbarVert/navbarVert";
import {CustomRouterLink} from "../../../../../ReusableDirectives/routerLink/routerLink";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ReportsApiService} from "../../../../../ReusableServices/reportsService";
import {DisplayGridComponent} from "../../../../../ReusableComponents/displayGrid/displayGrid";
import {ComponentsConfigService} from "../../../../../ReusableServices/componentsConfigService";
import {ToolsApiService} from "../toolsService";

@Component({
    selector: 'tools',
    directives: [DisplayGridComponent, CustomRouterLink, RouterOutlet, NavBarVert],
    templateUrl: 'app/Datahub/routes/applications/tools/benchMarkIndex/benchMarkIndex.html',
    providers:[ReportsApiService, ToolsApiService]
})
export class BenchMarkIndex {
    indexCodeSelected:string;

    reportsApi:ReportsApiService;
    toolsApi:ToolsApiService;
    alert:AlertService;
    reportObj: {Key: string, Parameters: {Name: string, Value: any}[]};

    bmonbItems:Array<any>;
    bmonbSubIndexCodeSelected: string;

    spSubIndexItems: Array<any>;
    spSubIndexCodeSelected: string;

    indexCodeNameItems: Array<any>;
    indexCodeNameSelected: string;

    indexDescriptionCodeItems: Array<any>;
    indexDescriptionCodeSelected: string;

    indexTypeSelected: string;
    includeIndexTypeSelected: string;
    excludeIndexTypeSelected: string;

    regionItems:Array<any>;
    indexTypeRegionsSelected: string;
    includeIndexTypeRegionsSelected: string;
    excludeIndexTypeRegionsSelected: string;

    countryItems:Array<any>;
    indexTypeCountriesSelected: string;
    excludeIndexTypeCountriesSelected: string;
    includeIndexTypeCountriesSelected: string;

    dateSelected: string;
    @Input() set currentDate(d: Date) {
        d.setDate(d.getDate()-2);
        this.dateSelected = this.toDateString(d);
    }
    @Input() showGrid(show: boolean = true) {
        if(this.dataTable){
            this.dataTable.showGrid(show);
        }
    }
    @ViewChild(DisplayGridComponent)
    dataTable:DisplayGridComponent;

    controlConfigBMONB:ComponentsConfigService;
    controlConfigMSCI:ComponentsConfigService;
    controlConfigSP: ComponentsConfigService;

    reports:{indexCode:number, name:string}[] = [
        {indexCode: 180, name: 'BMO Nesbitt Burns Index'},
        {indexCode: 171, name: 'MSCI'},
        {indexCode: 0, name: 'Risk Analytics Benchmarks'},
        {indexCode: 172, name: 'S&P'},
        {indexCode: 173, name: 'Scotia'},
        {indexCode: 174, name: 'TSX'},
        {indexCode: 200, name: 'Wilshire Index'},
        {indexCode: 186, name: 'World Government Bond Index'}
    ];

    constructor(private reportsApiSvc:ReportsApiService,
                private toolsApiSvc: ToolsApiService,
                private alertSvc: AlertService,
                private componentsConfigService: ComponentsConfigService) {
        this.reportsApi = reportsApiSvc;
        this.toolsApi = toolsApiSvc;
        this.alert = alertSvc;
        this.controlConfigBMONB = componentsConfigService.BenchMarkIndexControlConfig.templateBMONB;
        this.controlConfigMSCI = componentsConfigService.BenchMarkIndexControlConfig.templateMSCI;
        this.controlConfigSP = componentsConfigService.BenchMarkIndexControlConfig.templateSP;
    }

    reportsOnChange(value:string) {
        this.indexCodeSelected = value;
        this.refreshPage();
    }

    ngOnInit() {
        this.currentDate = new Date();
        this.indexCodeSelected = "180";
        this.refreshPage();
    }

    submitClicked() {
        var spSelected: string;
        var localControlConfig : any;

        if (this.reportsApi) {
            switch (this.indexCodeSelected) {
                case "180":
                    spSelected = this.bmonbSubIndexCodeSelected;
                    localControlConfig = this.controlConfigBMONB;

                    this.reportObj =  {Key: "GetMaxDateFromTblIndexNesbittBurns",
                        Parameters: [
                            {Name: "@pMonth", Value: new Date(this.dateSelected).getMonth() + 1},
                            {Name: "@pYear", Value: new Date(this.dateSelected).getFullYear()}
                        ]};

                    this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
                        .subscribe(
                            res=>{
                                if(res.length == 1){
                                    this.reportObj =  {Key: "GetNesbittBurnsIndex",
                                        Parameters: [
                                            {Name: "@pSpName", Value: spSelected},
                                            {Name: "@pDate", Value: res[0].maxdate}
                                        ]};

                                    this.toolsApi.FilterObject(JSON.stringify(this.reportObj));
                                    this.dataTable.GetParentPageDetails(localControlConfig, this.toolsApi, "BenchMarkIndex")
                                }
                            }
                            , error => { this.alert.error("submitClicked:GetMaxDateFromTblIndexNesbittBurns : async error #" + error.status); },
                            () => { });

                    break;
                case "171":
                    var pIndexType: number;
                    var pIncludeIndexType: number;
                    var pExcludeIndexType: number;
                    var pIndexCode: string = "";
                    var pIncludeIndexCode: string = "";
                    var pExcludeIndexCode: string = "";
                    localControlConfig = this.controlConfigMSCI;

                    if(this.indexTypeSelected == "REGION"){
                        pIndexType = 0;
                        pIndexCode = this.indexTypeRegionsSelected;
                    }
                    else if(this.indexTypeSelected == "COUNTRY"){
                        pIndexType = 1;
                        pIndexCode = this.indexTypeCountriesSelected;
                    }

                    if (this.includeIndexTypeSelected == "REGION"){
                        pIncludeIndexType = 0;
                        pIncludeIndexCode = this.includeIndexTypeRegionsSelected;
                    }
                    else if (this.includeIndexTypeSelected == "COUNTRY"){
                        pIncludeIndexType = 1;
                        pIncludeIndexCode = this.includeIndexTypeCountriesSelected;
                    }
                    else {
                        pIncludeIndexType = -1;
                    }

                    if (this.excludeIndexTypeSelected == "REGION") {
                        pExcludeIndexType = 0;
                        pExcludeIndexCode = this.excludeIndexTypeRegionsSelected;
                    }
                    else if (this.excludeIndexTypeSelected == "COUNTRY") {
                        pExcludeIndexType = 1;
                        pExcludeIndexCode = this.excludeIndexTypeCountriesSelected;
                    }
                    else {
                        pExcludeIndexType = -1;
                    }

                    this.reportObj =  {Key: "GetMSCIIndex",
                        Parameters: [
                            {Name: "@pReportDate", Value: this.dateSelected},
                            {Name: "@pIndexType", Value: pIndexType},
                            {Name: "@pIndexCode", Value: pIndexCode},
                            {Name: "@pIncludeIndexType", Value: pIncludeIndexType},
                            {Name: "@pIncludeIndexCode", Value: pIncludeIndexCode},
                            {Name: "@pExcludeIndexType", Value: pExcludeIndexType},
                            {Name: "@pExcludeIndexCode", Value: pExcludeIndexCode}
                        ]};

                    this.toolsApi.FilterObject(JSON.stringify(this.reportObj));
                    this.dataTable.GetParentPageDetails(localControlConfig, this.toolsApi, "BenchMarkIndex")

                    break;
                case "172":
                    spSelected = this.spSubIndexCodeSelected;
                    localControlConfig = this.controlConfigSP;

                    if(spSelected.includes("sp_Benchmark_GetSPDJGlobalIndex") || spSelected.includes("sp_Benchmark_GetSPIndexConstituent")){
                        spSelected = spSelected.replace("NULL", " '" + this.dateSelected + "'");
                    }
                    else{
                        spSelected = spSelected + " '" + this.dateSelected + "'";
                    }
                    this.reportObj =  {Key: "GetSPIndex",
                        Parameters: [
                            {Name: "@pSpName", Value: spSelected}
                        ]};

                    this.toolsApi.FilterObject(JSON.stringify(this.reportObj));
                    this.dataTable.GetParentPageDetails(localControlConfig, this.toolsApi, "BenchMarkIndex")

                    break;
            }
        }
    }

    refreshPage(){
        this.showGrid(false);

        if (this.reportsApi) {
            switch (this.indexCodeSelected) {
                case "180": //BMO Nesbitt Burns
                    this.reportObj = {Key: "GetBMONBLookup", Parameters: []};
                    this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
                        .subscribe(
                            res => {
                                this.bmonbItems = res;
                                if(res.length>0){
                                    this.bmonbSubIndexCodeSelected = res[0].value;
                                }
                            },
                            error => {
                                this.alert.error("refreshPage:GetBMONBLookup : async error #" + error.status);
                            },
                            () => {
                            }
                        );
                    this.bmonbSubIndexCodeSelected = "";
                    break;
                case "171" : //MSCI
                    this.getRegions();
                    this.getCountries();
                    this.indexTypeSelected = "REGION";
                    this.includeIndexTypeSelected = "NONE";
                    this.excludeIndexTypeSelected = "NONE";
                    break;
                case "172": //S&P
                    this.reportObj = {Key: "GetSPLookup", Parameters: []};
                    this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
                        .subscribe(
                            res => {
                                this.spSubIndexItems = res;
                                if(res.length>0){
                                    this.spSubIndexCodeSelected = res[0].value;
                                }
                            },
                            error => {
                                this.alert.error("refreshPage:GetSPLookup : async error #" + error.status);
                            },
                            () => {
                            }
                        );
                    this.spSubIndexCodeSelected = "";
                    break;
                case "173" : //Scotia
                    this.getIndexName();
                    this.getIndexDescription();
                    //this.indexTypeSelected = "REGION";
                    break;
            }
        }
    }

    toDateString(date: Date): string {
        return (date.getFullYear().toString() + '-' +
        ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
        ("0" + (date.getDate())).slice(-2));
    }

    getRegions(){
        this.reportObj =  {Key: "MSCIRegionLookup", Parameters: []};
        this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
            .subscribe(
                res => {
                    this.regionItems = res;
                },
                error => {
                    this.alert.error("getRegions:MSCIRegionLookup : async error #" + error.status);
                },
                () => {
                }
            );
    }

    getCountries() {
        this.reportObj =  {Key: "MSCICountryLookup", Parameters: []};
        this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
            .subscribe(
                res => {
                    this.countryItems = res;
                },
                error => {
                    this.alert.error("getCountries:MSCICountryLookup : async error #" + error.status);
                },
                () => {
                }
            );
    }

    getIndexName(){
        this.reportObj =  {Key: "GetScotiaIndexName",
            Parameters: [
                {Name: "@pReportDate", Value: this.dateSelected}
            ]};
        this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
            .subscribe(
                res => {
                    this.indexCodeNameItems = res;
                },
                error => {
                    this.alert.error("getIndexName:GetScotiaIndexName : async error #" + error.status);
                },
                () => {
                }
            );
    }

    getIndexDescription(){
        this.reportObj =  {Key: "GetScotiaIndexDescription",
            Parameters: [
                {Name: "@pName", Value: this.indexCodeNameSelected},
                {Name: "@pReportDate", Value: this.dateSelected}
            ]};
        this.reportsApi.getArrayFromQuery(JSON.stringify(this.reportObj))
            .subscribe(
                res => {
                    this.indexDescriptionCodeItems = res;
                },
                error => {
                    this.alert.error("getIndexDescription:GetScotiaIndexDescription : async error #" + error.status);
                },
                () => {
                }
            );
    }

    indexTypeOnChange(object:any){
        switch(object.name){
            case "IndexTypeSelect":
                this.indexTypeSelected = object.value;
                break;
            case "IncludeIndexTypeSelect":
                this.includeIndexTypeSelected = object.value;
                break;
            case "ExcludeIndexTypeSelect":
                this.excludeIndexTypeSelected = object.value;
                break;
        }
    }
}
