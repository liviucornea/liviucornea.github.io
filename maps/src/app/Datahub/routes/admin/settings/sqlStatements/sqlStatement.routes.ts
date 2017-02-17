import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {SqlStatements} from "./sqlStatement";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const SqlStatementRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Settings/SqlStatements', component: SqlStatements, canActivate:[AuthGuard]}
]);


