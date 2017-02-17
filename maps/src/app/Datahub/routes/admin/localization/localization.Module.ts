import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {LocalizationRouting} from "./localization.routes";
import {Localization} from "./localization";
import {LanguageModule} from "./language/language.Module";
import {ValueSetModule} from "./valueSet/valueSet.Module";

@NgModule({
    imports: [
        CommonModule, FormsModule,RouterModule,SharedModule,LocalizationRouting,LanguageModule,ValueSetModule
    ],
    declarations:[Localization]
})
export class LocalizationModule {
}
