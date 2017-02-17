import {Injectable} from '@angular/core';
import {ApiService} from "../../../../../ReusableServices/apiService";

@Injectable()
export class ManagedProgramDbService {

    constructor(private apiService: ApiService){}

    checkBusinessValidations(inputRecords, pageName)
    {
        switch (pageName) {
            case "RebalEntryUploadDisplayGrid":
                inputRecords.forEach(x=> {
                    let line = x;
                    x.cells.forEach(y=> {
                        if (y.name.toLowerCase() == 'missed account' && y.val == true) {
                            line.checkBox.disabled = true;
                        }
                        else if (y.name.toLowerCase() == 'existing instruction' && y.val == true) {
                            line.checkBox.disabled = true;
                        }
                    });
                });
                break;
            case "RebalEntryAuditDisplayGrid":
                inputRecords.forEach(x=> {
                    let line = x;
                    x.cells.forEach(y=> {
                        if (y.name.toLowerCase() == 'reviewed' && y.val == true) {
                            line.checkBox.disabled = true;
                        }
                    });
                });
                break;
            // case "ImplementChangePortfolioDisplayGrid":
            //     inputRecords.forEach(x=> {
            //         let line = x;
            //         x.cells.forEach(y=> {
            //             if (y.name == 'Action' || y.name == 'Source') {
            //                 y.val = decodeURIComponent(y.val);
            //             }
            //         });
            //     });
            //     break;
            // case "PortfolioDisplayGrid":
            //     inputRecords.forEach(x=> {
            //         let line = x;
            //         x.cells.forEach(y=> {
            //             if (y.name == 'Notes') {
            //                 y.val = decodeURIComponent(y.val);
            //             }
            //         });
            //     });
            //     break;
        }
    }
}