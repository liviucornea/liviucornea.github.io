import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnectionString } from "./connectionString";
import { AuthGuard } from "../../../../../ReusableServices/AuthGuard";

export const ConnectionStringRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Settings/ConnectionStrings', component: ConnectionString, canActivate: [AuthGuard] }
]);


