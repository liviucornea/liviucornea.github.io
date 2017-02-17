import {Component, Input, OnInit} from 'angular2/core';
import {AlertService} from "../../../../ReusableServices/alertService";
import { TdamWindowInputService,  modalObject} from './tdamWindowInput.service'
@Component({
    templateUrl: "app/Datahub/routes/administration/promotionrequest/tdamwindowInput.html",
    selector: 'tdamSimpleInput'
})
export class SimpleWindowInput implements OnInit{
    @Input('theInput') inputObject: modalObject;
    localObject: modalObject;
    active = true;
    constructor(private alert:AlertService, public outputService: TdamWindowInputService) {
    };
    ngOnInit(){
        this.localObject = new  modalObject(this.inputObject.type,this.inputObject.value,true)
    }
    save() {
    this.outputService.outputValue$.emit(this.localObject);
    }

    cancel() {
        this.localObject.toBeSaved = false;
        this.outputService.outputValue$.emit(this.localObject);
    }

}