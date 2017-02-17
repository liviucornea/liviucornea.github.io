import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AssignableListItems } from './assignableListItems'

describe('AssignableListItems', () => {

  let comp:    AssignableListItems;
         beforeEach(() => {
        comp = new AssignableListItems();

    });
    it('Component is created', () =>{
        comp.assignedList = [];
          expect(comp).toBeDefined() ;
    });
    it('Is moving all to input ', () =>{
        comp.assignedList = [{id:1,description:'Text'}, {id:2,description:'Text second'}];
        let allItemsNbr = comp.assignedList.length;
        comp.moveAllToInput();
        expect(comp.assignedList.length).toEqual(allItemsNbr) ;
    });



});

