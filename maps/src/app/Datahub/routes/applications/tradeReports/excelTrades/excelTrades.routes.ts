import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";
import {ExcelTrades} from "./excelTrades";

export const ExcelTradesRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Applications/TradeReports/ExcelTrades', component: ExcelTrades, canActivate:[AuthGuard]}
]);

