import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {SchematicExecutionRouting} from "./schematicExecution.routing";
import {SchematicExecution} from "./schematicExecution";
import {FormsModule} from "@angular/forms";
import {SchematicPreview} from '../schematicpreview/schematicpreview';

@NgModule({
    imports:      [ BrowserModule, FormsModule, SharedModule,SchematicExecutionRouting],
    declarations: [SchematicExecution,SchematicPreview ],

})
export class SchematicExecutionModule { }