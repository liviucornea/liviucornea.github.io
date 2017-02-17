import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Tools} from "./tools";
import {ToolsRouting} from "./tools.routes";
import {BloombergAIMModule} from "./bloombergAIM/bloombergAIM.module";
import {ManagedProgramDbModule} from "./managedProgramDb/managedProgramDb.module";
import {BenchMarkIndexModule} from "./benchMarkIndex/benchMarkIndex.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, ToolsRouting, BenchMarkIndexModule
        , BloombergAIMModule, ManagedProgramDbModule
    ],
    declarations:[Tools],

})
export class ToolsModule {
}