import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { routing } from './app.routing';
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./ReusableComponents/SharedModule";
import {HttpModule, BrowserXhr} from "@angular/http";
import {AdminModule} from "./Datahub/routes/admin/admin.module";
import {HomeModule} from "./Datahub/routes/home/home.Module";
import {CORSBrowserXHr} from "./CORSBrowserXHr";
import {ApplicationsModule} from "./Datahub/routes/applications/applications.module";
import {AccessDeniedModule} from "./Datahub/routes/accessdenied/accessdenied.module";
import {PageNotFoundModule} from "./Datahub/routes/pagenotfound/pagenotfound.module";
import {PageRedirectModule} from "./Datahub/routes/pageRedirect/pageRedirect.module";
import {DashboardModule} from  "./Datahub/routes/dashboard/dashboard.module";
import {UserProfileModule} from './Datahub/routes/userProfile/userProfile.module';

@NgModule({
    imports: [
        BrowserModule,HttpModule,
        FormsModule, RouterModule,
        routing,SharedModule, HomeModule,AdminModule, ApplicationsModule, AccessDeniedModule, PageNotFoundModule,PageRedirectModule,DashboardModule,UserProfileModule
    ],
    declarations: [AppComponent],
    providers: [{provide: BrowserXhr, useClass: CORSBrowserXHr} ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
