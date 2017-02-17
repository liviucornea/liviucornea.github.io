import { Component} from '@angular/core';
import {Location} from "@angular/common"
import {NavigationService} from "../../../ReusableServices/navigationService";
import {ApiService} from "../../../ReusableServices/apiService";


@Component({
    selector: 'admin',
    template: ``,
})

export class Admin {

    constructor(private apiService: ApiService, private navService:NavigationService, private location:Location) {
        apiService.setApplicationsBaseUrl();
    }
}