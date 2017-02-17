import {Injectable} from "@angular/core";
import { BrowserXhr} from '@angular/http'
@Injectable()
export class CORSBrowserXHr extends BrowserXhr {
    build():any {
        var x:any = super.build();
        x['withCredentials'] = true;
        return x;
    }
}
