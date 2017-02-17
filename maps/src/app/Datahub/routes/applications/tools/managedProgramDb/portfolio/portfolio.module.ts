import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {MpdbPortfolio} from "./portfolio";
import {MpdbPortfolioRouting} from "./portfolio.routes";
import {ApplicationsCommonModule} from "../../../aplicationsComponents/applicationsComponentsModule";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, MpdbPortfolioRouting, ApplicationsCommonModule
    ],
    declarations:[MpdbPortfolio],

})
export class MpdbPortfolioModule {
}