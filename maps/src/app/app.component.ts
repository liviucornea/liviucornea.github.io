import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {NavigationService} from "./ReusableServices/navigationService";

@Component({
    selector: 'my-app',
    template: require('./app.html')
   // styles:[require('./Datahub/assets/default.scss'), require('./Datahub/assets/theme_standard.scss')]
})
export class AppComponent {
    title = 'Data hub';

    constructor(@Inject(DOCUMENT) private document, private navService: NavigationService) {
        //Added navService object as it is used in app.html to display PageTitle. Please do not remove this
    }

 }