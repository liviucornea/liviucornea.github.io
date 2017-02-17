import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {TreeViewBuilder} from "./treeViewBuilder/treeViewBuilder";
import {treeViewMain} from "./treeViewMain/treeViewMain";
import {treeViewAddEditForm} from "./treeViewAddEditForm/treeViewAddEditForm";
import {treeViewChildrenParser} from "./treeViewChildrenParser/treeViewChildrenParser";
import {ReportBuilder} from "./reportBuilder/reportBuilder";
import {SharedModule} from "../SharedModule";


@NgModule({
    imports:      [FormsModule, BrowserModule, SharedModule],
    exports:[TreeViewBuilder, treeViewMain, treeViewAddEditForm, treeViewChildrenParser, ReportBuilder],
    declarations: [TreeViewBuilder, treeViewMain, treeViewAddEditForm, treeViewChildrenParser, ReportBuilder ],
    providers:[]
})
export class TreeViewModule { }

