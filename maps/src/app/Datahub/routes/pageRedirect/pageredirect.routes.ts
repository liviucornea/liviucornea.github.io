import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {PageRedirect} from "./pageRedirect";

export const PageRedirectRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/PageRedirect', component: PageRedirect}
]);


