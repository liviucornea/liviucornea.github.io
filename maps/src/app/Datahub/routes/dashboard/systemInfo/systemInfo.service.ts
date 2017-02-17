import {Injectable} from '@angular/core';
import {HttpAbstract} from "../../../../ReusableServices/httpAbstract";


@Injectable()
export class SystemInformationService {
    private systemMonitoring: string = '/monitoring';

    constructor(private httpServ: HttpAbstract) {
    }

    public getSystemMonitoringInfo() {
        return this.httpServ.fetch(this.systemMonitoring );
    }

}
