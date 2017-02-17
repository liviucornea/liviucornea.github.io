import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../ReusableComponents/SharedModule";
import {Auth} from "./auth";
import {AuthUserModule} from "./user/user.Module";
import {AuthRoleModule} from "./role/roler.Module";
import {AuthRouting} from "./auth.routes";
import {ResourceModule} from "./resource/resource.Module";
import {NotificationModule} from "./notificationAlert/notification.Module";
import {MenuItemModule} from "./menuItem/menuItem.Module";
import {AdminAuthApiService} from "./adminAuthApiService";
import {ApplicationsListModule} from "./applicationsList/applicationsList.module";

@NgModule({
    imports: [
        CommonModule, RouterModule,SharedModule,AuthRouting, AuthUserModule,AuthRoleModule,ResourceModule
        ,NotificationModule,MenuItemModule,ApplicationsListModule
    ],
    declarations:[Auth],
    providers:[AdminAuthApiService]
})
export class AuthModule {
}
