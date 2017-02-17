import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../../ReusableComponents/SharedModule";
import {PostingsByDateRouting} from "./postingsByDate.routes";
import {PostingsByDate} from "./postingsByDate";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule, FormsModule, PostingsByDateRouting
    ],
    declarations:[PostingsByDate],
    providers:[]

})
export class PostingsByDateModule {
}