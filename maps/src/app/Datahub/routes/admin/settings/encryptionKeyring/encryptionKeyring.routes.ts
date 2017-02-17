import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';
import { EncryptionKeyring } from "./encryptionKeyring";
import {AuthGuard} from "../../../../../ReusableServices/AuthGuard";

export const EncryptionKeyringRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'Datahub/Admin/Settings/EncryptionKeyring', component: EncryptionKeyring, canActivate:[AuthGuard]}
]);


