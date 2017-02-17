import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {AddEditPortfolio} from "./addEditPortfolio/addEditPortfolio";

@NgModule({
    imports: [
        CommonModule, FormsModule,  HttpModule, SharedModule
    ],
    exports: [
        AddEditPortfolio
    ],
    declarations: [
        AddEditPortfolio
    ]


})
export class ApplicationsCommonModule {
}