import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {PipelineDesignerRouting} from "./pipelineDesignerRouting";
import {FormsModule} from "@angular/forms";
import {PipeLineDesigner} from "./pipeLineDesigner";
import {SchematicFilter} from "./Schematics.pipe";

@NgModule({
    imports:      [ BrowserModule, FormsModule, SharedModule,PipelineDesignerRouting],
    declarations: [PipeLineDesigner, SchematicFilter],

})
export class PipelineDesignerModule { }