import {NgModule}       from '@angular/core';
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BenchMarkIndexRouting} from "./benchMarkIndex.routes";
import {BmiWorldGovernmentBondIndexModule} from "./worldGovernmentBondIndex/worldGovernmentBondIndex.module";
import {BmiTsxModule} from "./tsx/tsx.module";
import {BmiSandPModule} from "./sAndP/sAndP.module";
import {BmiRiskAnalyticsBenchmarksModule} from "./riskAnalyticsBenchmarks/riskAnalyticsBenchmarks.module";
import {BmiScotiaModule} from "./scotia/scotia.module";
import {BmiMsciModule} from "./msci/msci.module";
import {BenchMarkIndex} from "./benchMarkIndex";
import {BmiWilshireIndexModule} from "./wilshireIndex/wilshireIndex.module";
import {BmiBMONesbittBurnsIndexModule} from "./bmoNesbittBurnsIndex/bmoNesbittBurnsIndex.module";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, BenchMarkIndexRouting,
        BmiBMONesbittBurnsIndexModule, BmiMsciModule, BmiRiskAnalyticsBenchmarksModule, BmiSandPModule,
        BmiWilshireIndexModule, BmiScotiaModule, BmiTsxModule, BmiWorldGovernmentBondIndexModule
    ],
    declarations:[BenchMarkIndex],
    providers:[]

})
export class BenchMarkIndexModule {

}