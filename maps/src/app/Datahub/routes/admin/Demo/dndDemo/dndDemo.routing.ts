import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import {DnDDemo} from "./dndDemo";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";


export const DnDDemoRoute: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Demo/DragAndDrop', component: DnDDemo, canActivate:[AuthGuard]}
]);


