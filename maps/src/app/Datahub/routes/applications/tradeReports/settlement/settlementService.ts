import {Injectable} from '@angular/core';
import {ApiService} from "../../../../../ReusableServices/apiService";

@Injectable()
export class SettlementService {

    constructor(private apiService: ApiService){}

    ExecutePageRefresh(pagename,id = null)
    {
        switch(pagename) {
            case "TradesSummaryDisplayGrid_CoreID_child":
            case "TradesDetailsDisplayGrid_CoreID_child":
                return this.settlementTradesReportStatus(id);
            case "TradesSummaryDisplayGrid_Issues_child":
            case "TradesDetailsDisplayGrid_Issues_child":
                return this.settlementGetIssues(id);
        }
    }

    checkBusinessValidations(inputRecords, pageName)
    {
        switch (pageName) {
            case "TradesSummaryDisplayGrid_Issues_child":
            case "TradesDetailsDisplayGrid_Issues_child":
                inputRecords.forEach(x=> {
                    x.cells.forEach(y=> {
                        if (y.name.toLowerCase() == 'closed' && y.val == "Closed") {
                            y.val = 'Yes';
                        }
                    });
                });
                break;
        }
    }

    settlementTradesReportStatus(nID) {

        return this.apiService.getArrayFromQuery("SettlementTradesReportStatus", JSON.stringify({
            Parameters: [
                {Name: "@nID", Value: nID}
            ]
        }));
    }

    settlementGetIssues(nID) {

        return this.apiService.getArrayFromQuery("SettlementGetIssues", JSON.stringify({
            Parameters: [
                {Name: "@nCoreID", Value: nID}
            ]
        }));
    }
}