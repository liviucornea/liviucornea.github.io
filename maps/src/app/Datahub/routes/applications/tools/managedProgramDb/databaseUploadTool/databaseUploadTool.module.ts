import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {MpdbDatabaseUploadToolRouting} from "./databaseUploadTool.routes";
import {MpdbDatabaseUploadTool} from "./databaseUploadTool";
import {ManagedProgramDbService} from "../managedProgramDbService";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, MpdbDatabaseUploadToolRouting
    ],
    declarations:[MpdbDatabaseUploadTool],
    providers:[ManagedProgramDbService]

})
export class MpdbDatabaseUploadToolModule {
}