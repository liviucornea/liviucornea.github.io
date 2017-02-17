import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {EditPortfolio} from "./editPortfolio/editPortfolio";
import {NgModule} from "@angular/core";
import {PortfolioFilter} from "./editPortfolio/portfolio.pipe";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
@NgModule({
    imports: [
        CommonModule, FormsModule,  HttpModule, SharedModule
    ],
    exports: [
        EditPortfolio,PortfolioFilter
    ],
    declarations: [
        EditPortfolio, PortfolioFilter
    ]


})
export class ApplicationsCommonModule {
}