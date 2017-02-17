import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {ConfigBuilder} from "./configBuilder";
import {ConfigBuilderRouting} from "./configBuilder.routing";
import {configBuilderAddEditForm} from "./configBuilderAddEditForm/configBuilderAddEditForm";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports:      [FormsModule, BrowserModule, ConfigBuilderRouting, SharedModule ],
    declarations: [ConfigBuilder,configBuilderAddEditForm ],

})
export class ConfigBuilderModule { }

