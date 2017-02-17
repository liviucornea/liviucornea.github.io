import { NgModule }           from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import { EncryptionKeyringRouting } from "./encryptionKeyring.routes";
import {SharedModule} from "../../../../../ReusableComponents/SharedModule";
import {EncryptionKeyring} from "./encryptionKeyring";

@NgModule({
    imports: [BrowserModule, EncryptionKeyringRouting, SharedModule],
    declarations: [EncryptionKeyring],
})
export class EncryptionKeyringModule { }

