import {Component, Input, OnInit} from 'angular2/core';
import {AlertService} from "../../../../../ReusableServices/alertService";
import {PromotionRequestListService} from '../promotionList/promotionListService';
//import {PreApprovalItem} from '../promotionrequestObjects';
//import {ApiService} from "../../../../../ReusableServices/apiService";
@Component({
    templateUrl: "app/Datahub/routes/administration/promotionrequest/qaMessage/qaMessage.html",
    styleUrls: ["resources/Datahub/routes/administration/promotionrequest/promotionrequest.css"],
    selector: 'qaMessage'
})
export class QaMessage implements OnInit {
    @Input('theInput') promoID:string;

    active = true;
    showCurrentItem = false;

    constructor(public alert:AlertService, public listService:PromotionRequestListService) {
    };

    ngOnInit() {
    }

    makeItCurrent() {
        this.showCurrentItem = true;
    }
    update() {
        var self = this;
        self.listService.qaMessage.emit(0);
    }
    cancel() {
        var self = this;
        self.listService.qaMessage.emit(0);
    }

}