import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {MpdbReportsRouting} from "./reports.routes";
import {MpdbReports} from "./reports";
import {ManagedProgramDbService} from "../managedProgramDbService";

@NgModule({
    imports: [
        CommonModule, RouterModule, FormsModule, SharedModule, MpdbReportsRouting
    ],
    declarations:[MpdbReports],
    providers:[ManagedProgramDbService]

})
export class MpdbReportsModule {
}