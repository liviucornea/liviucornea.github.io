import {Injectable} from '@angular/core';
import {ApiService} from "../../../../../ReusableServices/apiService";

@Injectable()
export class ManagedProgramDbService {
    constructor(private apiService: ApiService){
    }

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
            case "ModuleUpdateDisplayGrid":
                inputRecords.forEach(x=> {
                    let line = x;
                    let b =  x.cells.find(y=> y.name.toLowerCase() == 'moid' && y.val == 66);
                    if(b)
                        x.cells.forEach(y=> {
                            if (y.name.toLowerCase() == 'name') {
                                y.val = y.val + '<br/><b>*Selectable through Modeling Tool by user</b>';
                            }
                            else if (y.name.toLowerCase() == 'mid') {
                                y.disabled = true;
                            }
                        });
                });
                break;
        }
    }
}