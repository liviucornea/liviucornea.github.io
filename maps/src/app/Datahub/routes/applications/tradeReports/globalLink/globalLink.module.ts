import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {GlobalLinkRouting} from "./globalLink.routes";
import {GlobalLink} from "./globalLink";
import {PostingsByDateModule} from "./postingsByDate/postingsByDate.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, GlobalLinkRouting, PostingsByDateModule
    ],
    declarations:[GlobalLink],
    providers:[]

})

export class GlobalLinkModule {

}