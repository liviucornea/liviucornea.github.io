import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {BmiTsxRouting} from "./tsx.routes";
import {BmiTsx} from "./tsx";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule, FormsModule, BmiTsxRouting
    ],
    declarations:[BmiTsx],
    providers:[]

})
export class BmiTsxModule {
}