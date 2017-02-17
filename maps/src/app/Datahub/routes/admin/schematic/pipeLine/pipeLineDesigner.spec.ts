import { PipeLineDesigner } from './PipeLineDesigner';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router } from '@angular/router';
import {SchematicApiService} from "../schematicService";
import {AlertService} from "../../../../../ReusableServices/alertService";

/*
describe('AppComponent', function () {
    let de: DebugElement;
    let comp: PipeLineDesigner;
    let fixture: ComponentFixture<PipeLineDesigner>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PipeLineDesigner ],
            providers:    [ SchematicApiService, AlertService, Router ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PipeLineDesigner);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h1'));
    });

    it('should create component', () => expect(comp).toBeDefined() );

});
*/

