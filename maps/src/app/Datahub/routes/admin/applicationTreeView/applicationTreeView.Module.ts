import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {FormsModule} from "@angular/forms";
import {ApplicationTreeView} from "./applicationTreeView";
import {ApplicationTreeViewRouting} from "./applicationTreeView.routing";
import {TreeViewModule} from "../../../../ReusableComponents/treeView/TreeViewModule";

@NgModule({
    imports:      [FormsModule, BrowserModule, ApplicationTreeViewRouting, SharedModule, TreeViewModule],
    declarations: [ApplicationTreeView ],
    providers:[]
})
export class ApplicationTreeViewModule { }

