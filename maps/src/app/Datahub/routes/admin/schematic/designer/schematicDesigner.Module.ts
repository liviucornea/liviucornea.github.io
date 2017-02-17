import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {SchematicDesigner} from "./schematicDesigner";
import {SchematicDesignerRouting} from "./schematicDesignerRouting";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports:      [ BrowserModule, FormsModule, SharedModule,SchematicDesignerRouting],
    declarations: [SchematicDesigner ],

})
export class SchematicDesignerModule { }