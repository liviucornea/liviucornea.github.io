import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {PageNotFoundRouting} from "./pagenotfound.routing";
import {PageNotFound} from "./pagenotfound";



@NgModule({
    imports: [
        CommonModule, RouterModule,PageNotFoundRouting
    ],
    declarations:[PageNotFound],

})
export class PageNotFoundModule {
}