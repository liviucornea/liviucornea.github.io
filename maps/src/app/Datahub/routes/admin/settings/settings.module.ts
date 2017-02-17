import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {Settings} from "./settings";
import { SettingsApiService } from "./settingsApiService";
import { SettingRouting } from "./settings.routes";
import { EncryptionKeyringModule } from "./encryptionKeyring/encryptionKeyring.module";
import { ConnectionStringModule } from "./connectionStrings/connectionString.module";
import { DefaultSettingsModule } from "./defaultSettings/defaultSettings.module";
import { AppConfigurationModule } from "./appConfiguration/appConfiguration.module";
import { SqlStatementModule } from "./sqlStatements/sqlStatement.module";

@NgModule({
    imports: [
        CommonModule, RouterModule, SharedModule,
        SettingRouting,
        EncryptionKeyringModule,
        ConnectionStringModule,
        DefaultSettingsModule,
        AppConfigurationModule,
        SqlStatementModule,
    ],
    declarations: [Settings],
    providers: [SettingsApiService]
})
export class SettingModule {
}
