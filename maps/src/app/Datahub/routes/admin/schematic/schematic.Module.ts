import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {SchematicRouting} from "./schematic.routes";
import {Schematic} from "./schematic";
import {SchematicApiService} from "./schematicService";
import {SchematicDesignerModule} from './designer/schematicDesigner.Module';
import {ConfigurationModule} from './configuration/configuration.Module';
import {SchematicExecutionModule} from './Execution/schematicExecution.Module'
import {PipelineDesignerModule} from './pipeLine/pipeLineDesigner.Module';

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule,SchematicRouting, ConfigurationModule, SchematicDesignerModule, SchematicExecutionModule, PipelineDesignerModule
    ],
    declarations:[Schematic],
    providers:[SchematicApiService]
})
export class SchematicModule {
}

