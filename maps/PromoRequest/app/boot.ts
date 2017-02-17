import {bootstrap}    from 'angular2/platform/browser'
import {provide, Injectable}    from 'angular2/core'
import {Http, HTTP_PROVIDERS, BrowserXhr} from 'angular2/http'
import {ROUTER_PROVIDERS,APP_BASE_HREF,Router,LocationStrategy,HashLocationStrategy,RouterLink} from 'angular2/router';
import {ApiService} from './ReusableServices/apiService'
import {AlertService} from './ReusableServices/alertService'
import {App} from './app'
import {HttpAbstract} from "./ReusableServices/httpAbstract";
import {ComponentsConfigService} from  './ReusableServices/componentsConfigService';
import {AppSettingsService} from './ReusableServices/appSettingsService';
import {matrixService} from "./ReusableServices/matrixService";
import {crudService} from "./ReusableServices/crudService";
import {RouterService} from "./ReusableServices/routerService";
import {NavigationService} from "./ReusableServices/navigationService";

//
// Project specific services
//

import {EtfApiService} from "../app/EMT/EtfCreationRedemption/etfcrService";
import {MiniMatrixService} from "./ReusableServices/miniMatrixService";
import {ConfigBuilder} from "./ReusableServices/configBuilder";
import {InterFormsService} from "./ReusableServices/interFormsService";

@Injectable()
export class CORSBrowserXHr extends BrowserXhr {
    build():any {
        var x:any = super.build();
        x['withCredentials'] = true;
        return x;
    }
}

bootstrap(App,
    [
        ROUTER_PROVIDERS,
        RouterService,
        NavigationService,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        //provide(APP_BASE_HREF, { useValue: '/' }), // this can be used for PathLocationStrategy, which we're not using
        HTTP_PROVIDERS,
        provide(BrowserXhr, {useClass: CORSBrowserXHr}),
        ApiService,
        AlertService,
        HttpAbstract,
        ComponentsConfigService,
        AppSettingsService,
        crudService,
        EtfApiService,
        matrixService,
        MiniMatrixService,
        ConfigBuilder,
        InterFormsService
    ]);
