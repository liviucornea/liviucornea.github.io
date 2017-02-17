import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";


import {SqlStatementRouting} from "./sqlStatement.routes";
import { SqlStatements } from "./sqlStatement";


@NgModule({
    imports: [BrowserModule, SqlStatementRouting, SharedModule],
    declarations: [SqlStatements],
})
export class SqlStatementModule { 

}

