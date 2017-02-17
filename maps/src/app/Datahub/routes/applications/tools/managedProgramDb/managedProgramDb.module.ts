import {NgModule}       from '@angular/core';
import {ManagedProgramDbRouting} from "./managedProgramDb.routes";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {ManagedProgramDb} from "./managedProgramDb";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MpdbAdministrationModule} from "./administration/administration.module";
import {MpdbAnalysisConstructionToolModule} from "./analysisConstructionTool/analysisConstructionTool.module";
import {MpdbDatabaseUploadToolModule} from "./databaseUploadTool/databaseUploadTool.module";
import {MpdbReportsModule} from "./reports/reports.module";
import {MpdbTasksModule} from "./tasks/tasks.module";
import {MpdbPortfolioModule} from "./portfolio/portfolio.module";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, ManagedProgramDbRouting,
        MpdbAdministrationModule, MpdbAnalysisConstructionToolModule, MpdbDatabaseUploadToolModule,
        MpdbPortfolioModule,MpdbReportsModule,MpdbTasksModule
    ],
    declarations:[ManagedProgramDb],
    providers:[]

})
export class ManagedProgramDbModule {

}