import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiSandPRouting} from "./sAndP.routes";
import {BmiSandP} from "./sAndP";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiSandPRouting
    ],
    declarations:[BmiSandP],
    providers:[]

})
export class BmiSandPModule {
}