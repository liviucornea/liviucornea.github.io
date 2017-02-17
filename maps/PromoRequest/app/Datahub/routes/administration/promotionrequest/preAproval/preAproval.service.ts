import {Component, Injectable, EventEmitter} from 'angular2/core';
import {PreApprovalItem} from '../promotionrequestObjects';

@Injectable()
@Component({})
export class PreAprovalService {
    public outputValue$:EventEmitter<PreApprovalItem>;

    constructor() {
        this.outputValue$ = new EventEmitter();
    }
};

