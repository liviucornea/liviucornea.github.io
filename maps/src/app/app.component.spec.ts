import { AppComponent } from './app.component';
import {DOCUMENT} from '@angular/platform-browser';
import { Location } from '@angular/common';
import {NavigationService} from "./ReusableServices/navigationService";
import { Router } from '@angular/router';
import {InterFormsService} from "./ReusableServices/interFormsService";

import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    inject,
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';

// Load the implementations that should be tested

describe(`App`, () => {
    /*
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    //let fixture:any;
    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [ NavigationService, InterFormsService, Router, Location]
        })
            .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;

        fixture.detectChanges(); // trigger initial data binding
    });

    it(`should be readly initialized`, () => {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });


    it('should not console log', () => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

    });
*/
});