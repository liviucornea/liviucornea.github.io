import {Routes, RouterModule} from '@angular/router';
import {Home} from "./Datahub/routes/home/home";
import {AuthGuard} from "./ReusableServices/AuthGuard";
import {PageNotFound} from "./Datahub/routes/pagenotfound/pagenotfound";



export const routes: any = [
    {path: '', pathMatch: 'full', redirectTo: 'Datahub/Home'},
    {path: 'Datahub/Home', component: Home, name: "Home", canActivate: [AuthGuard]},
    {path: 'Datahub', redirectTo: 'Datahub/Home'},
    {path: '**', component: PageNotFound}
];

const appRoutes: Routes = [
    ...routes
];

export const routing = RouterModule.forRoot(appRoutes);

