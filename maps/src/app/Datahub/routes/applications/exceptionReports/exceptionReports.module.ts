import {ExceptionReports} from "./exceptionReports";
import {ExceptionReportsRouting} from "./exceptionReports.routes";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";

@NgModule({
    imports: [
        CommonModule, SharedModule, FormsModule, ExceptionReportsRouting
    ],
    declarations:[ExceptionReports]
})
export class ExceptionReportsModule {

}