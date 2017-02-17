import {Component, Input} from '@angular/core';
import {matrixService} from "../../../../../ReusableServices/matrixService";
import {PortfolioComponentConfig} from "./editPortfolio.config";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {AlertService} from "../../../../../ReusableServices/alertService";

@Component({
    selector: 'editPortfolio',
    templateUrl: "..//editPortfolio/editPortfolio.html"
})

export class EditPortfolio {
    @Input() SystemId: number;
    gridSettings: any = PortfolioComponentConfig;
    inputData: any;
    formBuilder: any;
    public currentPortfolio: PortfolioItem;
    private allPortfolios: PortfolioItem[] = [];


    constructor(private vmMatrix: matrixService, private apiService: ApiService, private alert: AlertService){
    }

    ngOnInit() {
        this.searchPortfolios();
        //this.setDataSources();
    }

    displayFormBuilderInfo() {
        this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
    }

    onPortfolioSelected(portfolio:any) {
        var self = this;
        let portfolioId = portfolio.id;
        self.currentPortfolio = new PortfolioItem(portfolio.id, portfolio.number, portfolio.name);
        //self.getPortfolioById(portfolioNumber);
    }

    getPortfolio(portfolio:PortfolioItem) {
        var self = this;
    }

    searchPortfolios() {
        this.apiService.getArrayFromQuery("ManagedProgramDB_Portfolio", JSON.stringify({
            Parameters: [{Name: "@pType", Value: -1},
                {Name: "@pSystemId", Value: this.SystemId},
                {Name: "@pLoginName", Value: 'ghindg2'}] //this.apiService.CurrentUser.LoginName
        })).subscribe(
            res=> {
                this.allPortfolios = res;
            },
            error => {
                this.alert.error("ManagedProgramDB_GetGroup. Error in retrieving drop down info" + error.status);
            },
            () => {}
        );
    }

    setDataSources() {
        var PortfolioManager = this.gridSettings.ColumnConfiguration.find(p=> p.dbColumnName == 'PortfolioManager');
        var urlList: Array<any> = [{url: PortfolioManager.dataSourceAddress.tableName, body: PortfolioManager.dataSourceAddress.dbParameters}];
        this.apiService.fetchMultipleListWithBody(urlList).subscribe(
            res=> {
                PortfolioManager.dataSource = res;
                this.displayFormBuilderInfo();
            },
            error=> {
                this.alert.error("Error in retrieving drop down info" + error.status);
            },
            ()=> {
            }
        );
    }
}

export class PortfolioItem {
    constructor(public  id: number,
                public  number: string,
                public  name: string) {
    }
}
