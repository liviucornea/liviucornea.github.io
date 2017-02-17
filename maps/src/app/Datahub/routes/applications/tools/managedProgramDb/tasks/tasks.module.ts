import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {MpdbTasks} from "./tasks";
import {MpdbTasksRouting} from "./tasks.rotes";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, MpdbTasksRouting
    ],
    declarations:[MpdbTasks],

})
export class MpdbTasksModule {
}