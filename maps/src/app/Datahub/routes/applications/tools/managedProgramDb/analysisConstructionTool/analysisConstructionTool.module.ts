import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {MpdbAnalysisConstructionToolRouting} from "./analysisConstructionTool.routes";
import {MpdbAnalysisConstructionTool} from "./analysisConstructionTool";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, MpdbAnalysisConstructionToolRouting
    ],
    declarations:[MpdbAnalysisConstructionTool],

})
export class MpdbAnalysisConstructionToolModule {
}