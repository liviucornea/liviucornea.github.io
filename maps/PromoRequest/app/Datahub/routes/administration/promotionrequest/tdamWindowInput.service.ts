import {Component, Injectable, EventEmitter} from 'angular2/core';

@Injectable()
@Component({})
export class TdamWindowInputService {
    public outputValue$:EventEmitter<modalObject>;


    constructor() {
        this.outputValue$ = new EventEmitter();
    }


};

export class modalObject {
    constructor( public type:string, public value:string, public toBeSaved:boolean = true) {
    }
}