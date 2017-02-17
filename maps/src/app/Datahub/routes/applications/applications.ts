import {Component, OnDestroy} from '@angular/core';
import {NavigationService} from "../../../ReusableServices/navigationService";
import {ApiService} from "../../../ReusableServices/apiService";

@Component({
    selector: 'applications',
    template: ``
})

export class Applications implements  OnDestroy{
    constructor(private navService:NavigationService, private apiService: ApiService) {
    }

    ngOnDestroy()
    {
        this.apiService.setApplicationsBaseUrl();
    }
}