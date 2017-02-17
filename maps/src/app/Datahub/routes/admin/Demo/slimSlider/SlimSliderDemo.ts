
import {Component} from '@angular/core';
import {SlimLoadingBarService} from "../../../../../ReusableServices/slimLoadingBarService";


@Component({
    selector: 'demo-slim',
    template: require('./slimSliderDemo.html')
})
export class SlimSliderDemo {

    constructor(private slimLoader: SlimLoadingBarService) {}

    setProgres30() {
        this.slimLoader.progress = 30;
    }

    startProgress() {
        // We can listen when loading will be completed
        this.slimLoader.start(() => {
            console.log('Loading complete');
        });
    }

    completeProgress() {
        this.slimLoader.complete();
    }

    stopProgress() {
        this.slimLoader.stop();
    }

    resetProgress() {
        this.slimLoader.reset();
    }

    incrementProgress() {
        this.slimLoader.progress++;
    }

    changeProgressTo4px() {
        this.slimLoader.height = '4px';
    }

    changeProgressTo2px() {
        this.slimLoader.height = '2px';
    }

    changeProgressToBlue() {
        this.slimLoader.color = 'blue';
    }

    changeProgressToFirebrick() {
        this.slimLoader.color = 'firebrick';
    }
}
