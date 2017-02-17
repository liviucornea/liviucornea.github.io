import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {Language} from "./language";
import {LanguageRouting} from "./language.routing";

@NgModule({
    imports:      [BrowserModule, LanguageRouting, SharedModule],
    declarations: [Language],

})
export class LanguageModule { }
