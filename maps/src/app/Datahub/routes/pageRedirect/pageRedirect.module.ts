import {NgModule}       from '@angular/core';
import {PageRedirect} from "./pageRedirect";
import {PageRedirectRouting} from "./pageredirect.routes";

@NgModule({
    imports: [PageRedirectRouting
    ],
    declarations:[PageRedirect]

})
export class PageRedirectModule {
}