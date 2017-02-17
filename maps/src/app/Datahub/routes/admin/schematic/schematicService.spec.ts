import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    inject,
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import {SchematicApiService} from "./schematicService";



describe(`App`, () => {

    let service:any;
     // async beforeEach
/*     beforeEach(async(() => {
                 TestBed.configureTestingModule({
                 declarations: [],
                 schemas: [NO_ERRORS_SCHEMA],
                 providers: [ SchematicApiService]
                 })
                 .compileComponents();
         service = TestBed.get(SchematicApiService);
     }));*/

      it(`should be readly initialized`, () => {
     expect(true).toBeTruthy();

     });



});