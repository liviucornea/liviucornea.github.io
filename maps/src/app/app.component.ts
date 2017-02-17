import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {NavigationService} from "./ReusableServices/navigationService";
import {InterFormsService} from "./ReusableServices/interFormsService";

@Component({
    selector: 'my-app',
    template: require('./app.html')
})
export class AppComponent {
    title = 'Data hub';
    theme = 'standard';
    fontSize = 14;

    constructor(@Inject(DOCUMENT) private document, private navService: NavigationService, private intFormSvc: InterFormsService) {
        //Added navService object as it is used in app.html to display PageTitle. Please do not remove this

        this.intFormSvc.themeEmitter.subscribe((value) => {
            this.toggleTheme()
        });

        this.intFormSvc.fontSizeEmitter.subscribe((change) => {
            this.fontSize = this.fontSize + change;
        })
    }

    private toggleTheme() {
        if (this.theme == 'standard') {
            this.theme = 'dark';
        }
        else {
            this.theme = 'standard';
        }
    }
}