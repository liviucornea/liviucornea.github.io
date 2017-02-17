import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Admin} from "./admin";
import {LogsModule} from "./logs/logs.Module";
import {AuthModule} from "./auth/auth.mainModule";
import {ConfigBuilderModule} from "./configBuilder/configBuilder.Module";
import {ApplicationBuilderModule} from "./applicationBuilder/applicationBuilder.Module";
import {AdminMainRouting} from "./admin.MainRouting";
import {ScheduleModule} from "./schedule/schedule.Module";
import {SchematicModule} from "./schematic/schematic.Module";
import {ApplicationTreeViewModule} from "./applicationTreeView/applicationTreeView.Module";
import {LocalizationModule} from "./localization/localization.Module";
import {DemoModule} from "./Demo/Demo.Module";
import {AdminApiService} from "./adminApiService";


@NgModule({
    imports: [
        CommonModule, RouterModule,AdminMainRouting,
        ScheduleModule, LogsModule,ApplicationBuilderModule,
        AuthModule,ApplicationTreeViewModule,ConfigBuilderModule,
        SchematicModule, LocalizationModule, DemoModule
    ],
    declarations:[Admin],
    providers: [AdminApiService]

})
export class AdminModule {
}